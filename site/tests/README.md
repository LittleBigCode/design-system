# Quality gates

Two Playwright suites run against the docs app. The docs app is only the
harness — the subject under test is `@diametral/design-system`. Every component has a route
(`/docs/<slug>`) with a live playground, so driving the docs app exercises the
real components instead of fixtures written to make tests pass.

Both suites run against `vite preview` (a production build), not the dev server,
so what is measured is what consumers get.

```bash
npm --prefix site run test:a11y          # axe-core over every route, both themes
npm --prefix site run test:visual        # screenshot comparison, curated routes
npm --prefix site run test:visual:update # regenerate baselines — CI ONLY, see below
npm --prefix site run test:regress       # the per-component regression specs
```

## Route enumeration

`harness.ts` derives routes from `src/registry/registry.ts`, so a component added
to the registry is covered on the next run with no test edit. There is no
hand-maintained page list to drift.

The registry is filtered to what this package ships, so the suites cover exactly
the landed components — 30 today. A batch that lands a component and un-filters
its slug gets gate coverage on the next run, which is the point of the filter:
an absorbed component cannot ship untested.

Every route carries Vite's `base` (`/design-system`), because `vite preview`
serves the SPA under the same project subpath GitHub Pages does. `routePath()`
in `harness.ts` owns that prefix.

Both suites also assert the theme actually applied (`expectTheme`). Without that,
a broken `ThemeProvider` would turn the dark half of each suite into a duplicate
of the light half and both gates would still pass.

## a11y suite — every route, both themes

Runs axe-core and fails on `critical` or `serious` impact. `moderate` and `minor`
are reported but tolerated, so the gate flags blocking issues rather than
aesthetic preferences.

Both themes are covered because the `.dark` block overrides **tier-2 semantics
only** — exactly where a contrast regression can be introduced without touching a
single component. A light-only suite would not see it.

### Current status: report-only

Last measured: **53 / 148 passing**. Two token-level causes have already been
fixed (`--ds-ink-faint` and the dark `--ds-danger`, both now clearing 4.5:1);
what remains is the triage below, in descending order of leverage.

| Rule                          | Count | Root cause                                                                                                                                          | Whose bug       |
| ----------------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `color-contrast`              | ~71   | `code > span` — **shiki's syntax-highlight palette** against `bg-muted/40`. Not a design token; the highlight theme was never checked for contrast. | docs app        |
| `label`                       | 16    | demo form controls with no associated label                                                                                                         | demos           |
| `aria-required-children`      | 8     | a Base UI role whose required child roles are missing in our composition                                                                            | library         |
| `button-name`                 | 8     | icon-only buttons with no accessible name                                                                                                           | demos / library |
| `aria-toggle-field-name`      | 4     | toggle or switch with no accessible name                                                                                                            | demos           |
| `nested-interactive`          | 4     | an interactive element nested inside another                                                                                                        | library         |
| `scrollable-region-focusable` | 4     | a scrollable region still not focusable                                                                                                             | docs app        |

The largest item is a **docs-app** problem, not a library one: pick shiki themes
whose token colours clear 4.5:1 on the code-block background, or lighten the
background. Fixing it should clear roughly three quarters of the failures without
touching a component.

`.github/workflows/a11y.yml` runs the suite with `continue-on-error` and uploads
the report. **To arm the gate:** work the table down, then remove
`continue-on-error` and mark the job required.

### Known limitation: run-to-run variance

Violation counts move between runs on the same commit (one pair of runs reported
43 and then 80 `color-contrast` hits). The set of _failing routes_ is far more
stable than the per-run counts, so treat the counts as indicative and the route
list as the signal. Likely causes are the 400 ms settle in `settle()` being
marginal for chart animation, and axe evaluating whatever the playground happens
to have rendered. Worth stabilising before the gate becomes blocking — otherwise
it will flake.

## visual suite — curated routes, both themes

Deliberately not all 72 routes:

1. **Cost.** 72 routes x 2 themes is 144 full-page baselines — tens of megabytes
   of PNGs in git, re-churned on every intentional design change. The a11y suite
   is the one that covers everything, because it needs no committed artefact.
2. **Signal.** The routes in `visual.spec.ts` were picked to exercise the _visual
   language_ rather than component count: flat 1px rules, zero radius, the
   eight-colour tone axis, dense data display, overlay layering, chart palettes.
   A regression in any of those shows up here. One that shows up only on
   `/docs/aspect-ratio` is not a brand regression.

Add a route when it covers a visual property nothing else does.

### Baselines must be generated on Linux

`playwright.config.ts` sets `snapshotPathTemplate` without a platform key, so CI
compares against exactly what is committed. Sub-pixel font rendering differs
enough between macOS and Linux to exceed the 2% `maxDiffPixelRatio`.

**Do not run `test:visual:update` on a laptop and commit the result.** Instead:

1. Run the **Visual regression** workflow manually with `update_baselines: true`
2. Download the `visual-baselines` artifact
3. Commit it to `site/tests/__screenshots__/`

Until baselines exist the comparison step is skipped rather than failed, so the
workflow arms itself the moment they land.

## Determinism

`settle()` waits for network idle, `document.fonts.ready`, then one extra beat
for animation that CSS neutralisation cannot reach — Recharts animates via
`requestAnimationFrame`, not transitions. The visual suite additionally injects a
stylesheet killing animations, transitions and the blinking caret, after load so
it wins on ordering.
