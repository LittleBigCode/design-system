# Tests

Playwright suites for the Diametral Design System, run against the buildless
pages `npm run build` generates — `examples/components/<slug>.html` (one page
per registry entry) plus the hand-written showcase pages. This is the single
test harness for the package: it covers visual regression, accessibility, and
the per-component behavior-regression specs that used to live only under
`site/tests/`.

The design system itself stays dependency-free for consumers — Playwright is a
**devDependency** used only for testing and never ships in the published
package.

## Files

- `harness.ts` — shared helpers. `routePath("/docs/<slug>")` maps a component
  slug onto its generated page; `COMPONENT_ROUTES` is derived by reading the
  `examples/components/` directory (not hand-listed), so a new registry entry
  is covered with no test edit; `pinTheme`/`expectTheme`/`settle` mirror the
  same-named helpers `site/`'s suites used.
- `visual.spec.js` — full-page screenshot comparison over a curated set of
  pages (see below).
- `a11y.spec.js` — axe-core over every generated component page, both themes.
- `a11y-allowlist.js` — known pre-existing axe failures, each tied to an open
  issue, excluded from the blocking check only (axe still reports them).
- `*-regress.spec.ts` + `chart-marks.spec.ts` — per-component behavior
  regression specs moved here unedited from `site/tests/` (issue #33); they
  import only `routePath` and `settle` from `./harness`.

## How it works

- `playwright.config.js` starts a static file server (`python3 -m http.server
  8080`) at the repo root, so the buildless showcase in `examples/` is served as
  plain files (pages live at `http://localhost:8080/examples/...`). If you
  already have a server running (`npm run serve`), it is reused.
- `tests/visual.spec.js` visits a curated set of key pages: the hand-written
  showcase pages (`index`, `kitchen-sink`, `theming`, legacy component/template
  pages) plus 15 generated component pages picked to exercise the visual
  language rather than component count — tone axis, 1px rules, form controls,
  dense data, chart palette, overlay layering, app chrome, date grids (the
  same 17 routes `site/tests/visual.spec.ts` used before issue #33). For each
  page it:
  1. navigates to the page,
  2. waits for the network to go idle and for `document.fonts.ready`,
  3. injects a stylesheet that disables all animations, transitions, and the
     text caret (so renders are deterministic),
  4. asserts a full-page screenshot matches the baseline
     (`maxDiffPixelRatio: 0.02` tolerates anti-aliasing noise).
- Rendering is pinned for reproducibility: a fixed `1280x900` viewport,
  `deviceScaleFactor: 1`, and a single Chromium project.
- **Baselines** live in `tests/__screenshots__/` and **must be committed**. CI
  compares the rendered pages against these committed images; if they drift, the
  run fails and uploads a diff.

> **Network is required.** The charts, datagrid, and React showcase pages import
> React (and friends) from `esm.sh` at runtime. Without network access those
> pages won't render and their screenshots will be wrong.

## First-time setup

```bash
npm i                                    # installs @playwright/test (devDependency)
npx playwright install --with-deps chromium   # downloads the Chromium browser
```

## Generating baselines (run once, then commit)

There are no baselines until you create them. Generate the initial set and
commit the resulting `tests/__screenshots__/` directory:

```bash
npm run test:visual:update     # = playwright test --update-snapshots
git add tests/__screenshots__
git commit -m "test: add visual regression baselines"
```

Re-run `npm run test:visual:update` and commit whenever an intentional visual
change should become the new expected baseline.

> Baselines are platform-sensitive (font rendering differs across OSes). For CI
> on `ubuntu-latest`, the most reliable baselines are ones generated on Linux —
> e.g. via the `visual-tests` workflow's update path, or in a matching
> container/CI environment.

## Running the suite

```bash
npm run test:visual            # = playwright test  (compares against baselines)
```

A failing run writes an HTML report to `playwright-report/` and per-test diff
images under `test-results/`:

```bash
npx playwright show-report
```

Both `test-results/` and `playwright-report/` are git-ignored;
`tests/__screenshots__/` is committed.

## Accessibility

`tests/a11y.spec.js` runs [axe-core](https://github.com/dequelabs/axe-core) (via
[`@axe-core/playwright`](https://www.npmjs.com/package/@axe-core/playwright))
and **fails on any violation of impact `critical` or `serious`**. Less severe
findings (`moderate`/`minor`) are still reported by axe but do not fail the
suite, so the gate flags only genuinely blocking issues — handy given the
deliberately flat, low-chrome aesthetic.

It reuses the same setup as the visual suite (the shared `playwright.config.js`
static server + Chromium), so no extra config is needed. Two groups of tests:

- A handful of hand-written showcase pages (`index`, `kitchen-sink`, the
  legacy `examples/css/buttons.html` / `forms.html` / `web-components.html`,
  and `examples/demo.html` — the live React console, signed in first). These
  require network access for the pages that load React from `esm.sh`.
- **Every generated component page** (`COMPONENT_ROUTES` from `harness.ts`,
  read off the `examples/components/` directory), in **both themes**. The
  shared docs-shell chrome (`.docs-head`, `.docs-crosslink`) is excluded from
  the scan rather than allowlisted, since a real chrome defect there would
  otherwise fail every route instead of pointing at its own page.

Known pre-existing failures are recorded in `a11y-allowlist.js`, each tied to
an open issue (route + theme + axe rule id). axe still runs and still reports
an allowlisted violation; it just doesn't fail the build. Delete the entry
once the linked issue is fixed — the gate starts enforcing it immediately.

On failure the error message names, for each blocking violation, the rule id,
the affected page, and a representative node selector, so the report points
straight at the offending element.

```bash
# Install the extra devDependency once (the test:a11y npm script runs the spec):
npm i
npx playwright install --with-deps chromium

# Run only the accessibility suite:
npx playwright test tests/a11y.spec.js
```

## Behavior regression

`npm run test:regress` runs the per-component behavior-regression specs
(`tests/*-regress.spec.ts` + `tests/chart-marks.spec.ts`) against the generated
pages — drawer focus trap, tooltip, tree, stepper, kanban, calendar, chart
marks, color picker, data table, radio group, and three batch-specific specs.
They were moved here unedited from `site/tests/` (issue #33): only
`tests/harness.ts`'s `routePath()`/`settle()` change under them, mapping
`/docs/<slug>` onto `examples/components/<slug>.html` instead of a Vite dev
route.

```bash
npm run test:regress
```

The accessibility suite also runs in CI via the `a11y` workflow
(`.github/workflows/a11y.yml`) on pull requests, and uploads the Playwright
report as an artifact when it fails.
