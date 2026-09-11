<!--
Derived artifact. Copied from diamorval/design-system-diametral,
branch research/inventory, commit 6aeed040c0a682790c38f7edea2a091c2d60a6dd, path docs/migration/batch-plan.md.
Copied 2026-09-01. Do not edit here to correct a measurement — correct it at
the source and re-copy, or the two diverge silently.
-->

# The batch execution plan

Resolution artifact for [The batch execution plan](https://github.com/diamorval/design-system-diametral/issues/167), the final ticket on [Absorb @diametral/ui into the official Diametral design system](https://github.com/diamorval/design-system-diametral/issues/151). Consumes [`inventory.md`](./inventory.md), [`react-ledger.md`](./react-ledger.md) and [`css-ledger.md`](./css-ledger.md).

Measured 2026-08-30 against source `packages/ui` @ `feat/css-conversion` (9182a91) and target `/Users/augustinmorval/code/design-system` @ `feat/components-migration` (23a0198, v0.11.0).

**This document is the map's destination.** When it exists and needs no further decisions, the map is done and execution is handed off.

**Amended 2026-09-01** by [#174](https://github.com/diamorval/design-system-diametral/issues/174), folding in [#169](https://github.com/diamorval/design-system-diametral/issues/169), [#171](https://github.com/diamorval/design-system-diametral/issues/171) and [#173](https://github.com/diamorval/design-system-diametral/issues/173). Nothing below re-decides which components absorb or in what order.

### The source ref

**Every batch reads the annotated tag `migration-source-v1`.** Never `feat/css-conversion`'s tip, never `main`. It is `migration-source` (`9182a91` — the provenance pin all four ledgers measured, already on origin) plus **one** commit on branch `migration-source-stripped` that unwraps `@layer utilities { … }` from all 111 stylesheets under `packages/ui/src/styles/`. Cutting that branch and tag is the queue's first item, not a batch task ([#171](https://github.com/diamorval/design-system-diametral/issues/171)).

**Nothing unfreezes the pin.** A source defect found mid-migration — a broken selector, a wrong token — is **fixed forward in the target**, inside the batch that hits it, and recorded as one line in `docs/absorption/`. Neither ref is ever re-cut, rebased or force-pushed, so all eight batches describe one tree and the ledgers keep meaning what they measured. The accepted cost is that source and target diverge with no trace outside that ledger line; that is bearable because `@diametral/ui` was never published and is not maintained past this migration.

**Why the strip is exiled to its own branch** rather than done in place: `apps/web` still carries ~710 Tailwind utility literals and imports the same `globals.css`. Unwrapping a layered rule does not *lower* its priority — it makes the rule **unlayered**, and unlayered rules beat every layered rule, Tailwind's own `@layer utilities` included. Stripping on `feat/css-conversion` would silently stop those 710 consumer overrides from winning. In the target, which has neither `@layer` nor Tailwind, unlayered is a cascade no-op.

**The unwrap.** Delete the `@layer utilities {` line and its matching closing `}`; dedent the enclosed block by 2. **Key the transform on the `@layer` line, not on line 1** — `label.css`, `textarea.css` and `kbd.css` open with a preamble comment and a "delete line 1" recipe corrupts all three. `label.css` carries a second block, `@layer components`, deliberately at lower priority; unwrap both — it precedes the utilities block in source order, so equal-specificity rules resolve the same way unlayered. `separator.css` and `label.css` each match `@layer utilities` twice, one match inside a comment: the real block count is **111, one per file**. The strip covers all 111 files, not the 82 [`css-ledger.md`](./css-ledger.md) §5.1 scopes to landing components — stripping the 29 that never land costs nothing and removes a per-file judgement call from every batch.

### Re-verified against `9182a91`

[#169](https://github.com/diamorval/design-system-diametral/issues/169) re-measured five rows on 2026-09-01. **Four confirm exactly** and are marked as re-verified, not silently left: the `z-index: 50` split holds at **7 + 2 + 9**; **zero** ledger verdicts flipped, so the headline stays **40/45/30/4**; per-batch landing LOC is exact to one line (2,031 · 2,345 · 1,840 · 1,591 · 1,889 · 2,464 · 2,715 · 1,528 = **16,403** against the 16,402 below — these are the figures *before* the `separator` re-cut, which moves 39 LOC from batch 3 to batch 2); and the 41-vs-56 dedupe-exception tension never existed — both numbers read one measurement.

**One row is corrected**: `.ds-input` is **one-way, not four-way** (§4, batch 7). **One input the plan never had is added**: **17 forward cross-batch imports** (§2, §4, §6). No batch needs a re-cut for size; one batch boundary moves for cluster integrity (`separator`, batch 3 → batch 2).

---

## Headline

**89 components absorb, in 8 batches of ~2,050 landing LOC each, ordered risk-ascending, behind a batch 0 that publishes nothing.**

| | |
| --- | --- |
| absorbed components | **89** (40 admit outright − `stat-card` flip, 45 source wins, 4 CSS-only) |
| landing LOC (tsx + css) | **16,402** (re-measured: **16,403**, a one-line rounding difference) |
| never absorbed | **30** components, 9,091 LOC — the incumbent holds |
| batches | **8**, `1.0.0-beta.1` … `1.0.0-beta.8`, then `1.0.0` |
| batch 0 | infrastructure + everything touching only held or global surfaces. **No beta.** |
| new npm dependencies | **3** — `@dnd-kit/core`, `/sortable`, `/utilities`, in batch 8 |

`stat-card` flips to *incumbent holds* (§1.1), so the ledger headline moves from 40/46/29/4 to **40/45/30/4**.

---

## 1. The four decisions this ticket owed

### 1.1 `stat-card` holds — §6.1 of the CSS ledger confirmed

[#166](https://github.com/diamorval/design-system-diametral/issues/166) ruled it *source wins* on the stated reason "incumbent is a class-applier". It is not:

```js
StatCard.js:16   const [shown, setShown] = useState(value);
StatCard.js:17   useEffect(() => { ... requestAnimationFrame ... });
StatCard.js:33   return () => cancelAnimationFrame(raf);
```

`StatCard.js` (61 LOC) runs a count-up tween; the source's `stat-card.tsx` (88 LOC) has zero hooks. Rule 3's premise fails and rule 4's fails too — the source is a regression here, not a superset. **`stat-card` is incumbent holds and `stat-card.css` is held.** The CSS ledger already recorded it conservatively; this makes it final.

### 1.2 The chart merge folds two target files into one

Target `bar-chart.css` (106 L) + `charts.css` (275 L) are both replaced wholesale; the source has one `chart.css` (178 L). Neither target file is externally read, so neither name is a contract. **Both are deleted and the source's single `chart.css` lands.** Splitting the source to preserve a target file split that nothing depends on would be pure ceremony.

### 1.3 `form-controls.css` becomes seven files plus a radio remnant

Six of its seven React readers go to the source, `Radio`/`RadioGroup` holds. **The six leave as their source-named files** — `checkbox.css`, `checkbox-group.css`, `input.css`, `input-group.css`, `select.css`, `slider.css`, `textarea.css` — and `form-controls.css` stays, holding only the radio block.

Three reasons, none of them taste: [#157](https://github.com/diamorval/design-system-diametral/issues/157)'s C2 makes flat kebab and source file granularity the go-forward shape; the six replacements arrive as seven distinct source stylesheets already, so keeping one file means merging them back by hand; and shrinking `form-controls.css` to the radio block makes its one held reader visible instead of buried in 315 lines. The file is not externally read, so no contract moves. This closes the ledger's only *split* row.

### 1.4 The charte-conformance list is batch 0, not per-component

The map's other open fog patch. Measurement dissolves the "own batch vs folded per-component" question, because **most of its edits land on components no absorption batch ever touches**.

The red-strip splits three ways across the target's 20 red files:

| where | files | cost |
| --- | --- | --- |
| **replaced wholesale** — `charts`, `bar-chart`, `progress`, `kanban`, `stepper`, `spinner`, `sparkline` | 7 | **free** — the red leaves with the file |
| **held** — `vertical-nav`, `tabs`, `date-picker`, `rating`, `toast`, `calendar-view`, `datagrid`, `file-upload`, `motion`, `tree`, `date-range` | 11 | **real, and unattached to any batch** |
| **frozen, charte-sanctioned** — `grid.css` keeps its red lines ([#160](https://github.com/diamorval/design-system-diametral/issues/160)); `badge.css` strips | 2 | batch 7 for `badge` |

So the eleven held files are edits that belong to nothing else, conflict with nothing, and should land once and early. **They go in batch 0.3**, together with the global token and slot-layer work. Only Lucide→Phosphor rides a component batch, and it is narrower than assumed — **8 files**, concentrated in `react/components/icons.js`, `Icon.js`, their `.d.ts`, `components/ds-icon.js`, `examples/components/icons.html`, `css/components/icon.css` and `docs/for-claude.md` — so it rides **batch 7** with `icon`, whose `icon.css` is frozen.

---

## 2. The ordering rule

**Risk-ascending, family clusters whole, dependency overrides tier.**

A component's tier is the highest-risk CSS operation it performs:

| tier | operation | why it is riskier than the one above |
| --- | --- | --- |
| **T1 add** | its CSS lands in a namespace the target does not define | nothing can collide; nothing existing changes |
| **T2 replace** | it replaces an uncoupled target stylesheet wholesale | an in-repo surface may read the old classes |
| **T3 absorb** | it merges into a frozen external contract | class names are fixed by a published surface |
| **T4 swap** | it carries a behavioural change and owes a regress spec | correctness, not just cascade |

Two overrides, applied in this order:

1. **Dependency beats tier.** `combo-chart.tsx:16` imports `ChartContainer`/`ChartLegend`/`ChartTooltip` from `./chart.js`, so the eight net-new charts cannot land before the `chart` primitive — which is T2, because its stylesheet replaces two target files. The whole chart family therefore sits at the T1/T2 boundary as batches 4 and 5.

   The rule is applied **once as a re-ordering**, but it is not the only forward dependency. [#169](https://github.com/diamorval/design-system-diametral/issues/169) found **17 forward cross-batch imports** besides it. Sixteen have a target symbol to re-compose onto and so become re-wiring obligations rather than re-orderings (see §4). The seventeenth — `item` → `separator` — has none, and forces the one boundary move this amendment makes.
2. **Family clusters stay whole within a tier**, so no batch splits the overlay family (where 7 of the 18 `z-index: 50` rules concentrate) or the form-control family.

**Why this order and not the reverse.** A net-new component adds classes nothing already reads, so beta.1 is the artifact that *cannot* break an installed consumer. Under [#159](https://github.com/diamorval/design-system-diametral/issues/159) a batch that fails its gate is a stalled release, and the earliest batches are the ones with the least experience behind them. Risk-ascending puts the cheapest, safest work where the process is least proven.

**Re-cutting.** The rule above regenerates the sequence from the ledgers. A batch may be re-cut at any time by re-applying it; the cluster constraints in §4 are the only hard boundaries.

### Why sizing is by landing LOC

Component count is a bad proxy — `sidebar` is 674 LOC against `separator`'s 39 — and the CSS ledger showed the workload has *inverted*: additions are 38 files and ~2,890 LOC against 20 replacements. "Verifiable together" is not a constraint either: [#163](https://github.com/diamorval/design-system-diametral/issues/163)'s gate derives its routes from `registry.ts`, so gate scope is free at any granularity and can be route-filtered per batch. That leaves landing LOC — tsx + css of what actually moves — as the only measure that tracks session cost. **~2,050 LOC per batch** keeps a batch inside one ~100K session with room for the gate run and the `renames.json` capture.

---

## 3. Batch 0 — infrastructure. No beta.

Batch 0 publishes nothing. Its rule: **everything that touches only held or global surfaces**, so no absorption batch can conflict with it. Three sequential work items, no beta between them; their content ships with `beta.1`.

The dist-tag is deliberately left unexercised until `beta.1` carries real content. `publish-npm.yml` fires today on any `v*` tag with a bare `npm publish`, so nothing may be tagged before 0.1 lands.

**Batches 0.1 and 0.3 have no verification gate, by construction** ([#173](https://github.com/diamorval/design-system-diametral/issues/173)). [#163](https://github.com/diamorval/design-system-diametral/issues/163)'s gate *is* the docs app, and `site/` cannot build or render before 0.1 establishes the tsc emit — so tiers 1 and 2 are unavailable to 0.1 and 0.3, and **tier-3 contract checks are the bar there**. This is the map's last open fog patch, answered negative and with a reason.

### 0.1 — Release and verification plumbing

- Cut the long-lived **`v1` branch**; `main` stays at 0.11.0 so the gh-pages docs never advertise a system `latest` cannot install (#159 R12).
- **`publish-npm.yml` learns a dist-tag** — `next` for prereleases. Required *before* beta 1 (#159).
- **Port the source's `package` CI job** (#163 V9), with a component-class assertion, not just a token grep — the omission that let #154's dangling `@import`s ship. Brings the target the commercial-font tarball assertion it entirely lacks: Ufficio is kept out of the tarball by `.npmignore` alone.
- Add **#155's two CI checks**, release-blocking: every `ds-*` class a component renders resolves to a defined selector, and the non-React layers import nothing.
- Keep the **`@layer utilities` CI check** (#157 C3), **repurposed**. The strip is paid once upstream on `migration-source-v1`, so this is no longer an enforcement mechanism forcing every batch to strip — it is a cheap invariant guard that should never fire.
- **Arm `a11y.yml`** (#163 V3) — the REPORT-ONLY header is false on both halves: both repos independently ship `--ds-ink-faint: #6c6f7d`, so nothing diverged from `tokens.json`.
- Add **`web-components.html`** to the target's a11y spec (#163 V7) — it is the only page exercising the 11 web components and is in neither suite today.
- **Un-hardcode `kanban-regress.spec.ts:50`** (it pins `localhost:5173`, the dev server, so it cannot run under the configured `webServer`) and add a **`test:regress` script**; neither regress spec is wired to any workflow.
- Set an **explicit CI worker count and a per-test timeout above 30 s** (#163 V11) — the 8 failures in the 240-test run were all load timeouts, not axe violations.
- **Extract `docs/migration/variants.json`** from the design-sync cache — 259 cells, 234 domain-authored notes — then **delete the cache** (#163 V6).
- **Establish the tsc-only build** (#155): one authoring model, everything TSX, `.d.ts` generated, the source's proven pipeline ported. The target's first compile step for any surface.
- **Demote `./react/*`** so the barrel is the only supported React entry (#159 amendment) — this is the free window that permanently kills #158's PascalCase collision defect and lets every batch author kebab.
- Docs debt: delete `versioning.md`'s pre-1.0 blocker paragraph (cleared by #161), delete the three stale runbook blocks in `RELEASE.md` and `docs/installation.md` (the dual-registry claim was wrong), and write the **ADR naming Base UI as a substrate** (#155).
- Scaffold **`docs/migration/renames.json`** empty, plus the generators that read it for the migration guide and CHANGELOG.

### 0.2 — `site/`

[#163](https://github.com/diamorval/design-system-diametral/issues/163)'s gate **is** the docs app, so the harness must exist before batch 1 can be verified. #163's V10 makes `site/` load-bearing for the release: it can never be dropped, left broken, or excluded from CI.

The eight-step move from #158, plus two:

1. Copy `apps/web` in as **`site/`** — a nested directory with its own lockfile, deliberately **not** a workspace member, so its ~15 devDeps never leak into the zero-dep package's resolution graph (D1).
2. Vite `base`, router `basename`, `404.html` SPA fallback; deployed by the existing `pages.yml` on push to `main` (D2).
3. Install the package **`file:..`** (D3) — npm symlinks it, so imports resolve through the real `exports` map against working-tree files, catching the broken-exports-map class a Vite alias hides.
4. Repoint the `demo-source` plugin's source path — it needs TSX source, not the emit.
5. Rewrite the **1,109 deep imports across 576 tsx** to the barrel (forced by 0.1's `./react/*` demotion).
6. Swap the stylesheet entry to `dist/diametral.css` (#157 C9 — one deliverable, not two).
7. Local chrome CSS in the app, redefining the ~10 shadcn slot names 0.3 deletes (D6). Tailwind stays inside the docs app; CSS-1 forbids it as a *consumer* requirement, which a docs app is not.
8. Delete `showcase.tsx` (54.7 K) (D8); copy the `components-page` skill in (D7). `examples/` travels verbatim — it is the only committed fixture the visual and a11y suites have.
9. **Seed `registry.ts` with the 30 held target components.** Without this they are never gate-covered, since the registry is what generates routes (#163 V2) — they ship in 1.0.0 and would otherwise be the only untested part of it.
10. Wire the **`docs/components.md` generator** off the same `registry.ts` (D5), so drift is structurally impossible.

It is a **PR check, never a release gate** as a deliverable (D4); the components it renders are release-gated (V10).

**None of the eight steps is dropped.** [#173](https://github.com/diamorval/design-system-diametral/issues/173) tested two premises against the target and both were wrong: the Vite app *arrives with the move* (step 1 copies `apps/web` in), so `base` / `basename` / `404.html` are exactly right and the target being buildless is why those steps exist; and D2 already accounted for `pages.yml` and named `examples/` unmovable. `site/` collides with no target directory. What the checklist misses is six mechanical defects:

| | defect | fix |
| --- | --- | --- |
| **A** | `apps/web/vite.config.ts` sets no `build` block, so Vite's default `assetsDir: "assets"` merges the SPA's hashed bundles into the `_site/assets` that `pages.yml:28` fills with the fonts and logos `examples/*.html` link as `../assets/fonts/ufficio.css`. The only real collision. | **`build.assetsDir: "_app"`** |
| **B** | `pages.yml:37` runs `cp deploy/pages-redirect.html _site/index.html` *after* the bulk copy, clobbering the SPA. | **Delete the line and `deploy/pages-redirect.html`** — not reorder around them |
| **C** | `dist/diametral.css` is written by `build-css.mjs` and `dist/` is gitignored, so the `file:..` install resolves to a package with no stylesheet in a fresh checkout. | Root **`npm run build` is a hard prerequisite**, not the soft ordering note D3 made of it |
| **D** | `demo-source` climbs *three* levels from `apps/web/plugins` but only *two* from `site/plugins`, and hard-throws for any playground whose component TSX is missing. Copied in with 118 playgrounds, **`site/` fails to build**. | **Filter `registry.ts` to components present in the target**; each batch un-filters its own slugs. Correctness, not optimisation |
| **E** | 2 of 121 import specifiers have no mapping: `lib/utils`' `cn` (5 files) does not resolve — the target exposes no `./lib/*`. And the target barrel is a hand-written 84-export monolith unrelated to `react/components/*`. | Use the barrel's **`cx`**; **order step 5 strictly after 0.1's tsc emit** |
| **F** | The `components-page` skill says `pnpm --filter web build`. The target is npm with no workspace, and its `.claude/` is untracked. | Correct the command as the skill is copied in |

**`pages.yml` afterwards.** Same trigger, same job. It **gains** `setup-node` + the root build + the `site/` build, then `cp -r site/dist/* _site/` and `cp _site/index.html _site/404.html`. It **loses** the redirect line (defect B). `examples/` still ships verbatim — it is the only committed fixture the visual and a11y suites have.

**One gate-integrity bug, fixed on the way in.** `apps/web/src/App.tsx:20` carries `<Route path="*" element={<Navigate to="/" replace />} />`, so a registry-derived route for a page that does not exist **silently redirects and the gate passes green**. One line to remove, but [#163](https://github.com/diamorval/design-system-diametral/issues/163)'s tier 1 is not sound without it.

### 0.3 — Global CSS and the charte-conformance list

Everything here touches held or global surfaces only.

- **Delete the shadcn slot layer** (#157 C5). Rewriting its 32 unprefixed globals to `--ds-*` removes an indirection tier and kills a live `--accent`/`--card` conflict with `legacy-aliases.css`. `versioning.md` scopes the API to `--ds-*`, so this is not a contract break and owes no deprecation.
- In the same edit, `--primary: var(--ds-accent)` → `var(--ds-action)` (`globals.css:317`). **One line executes #160's red-strip across the source's 20 red surfaces.**
- **`--ds-vert` / `--ds-green-brand` → `#53ff64`** in the target's `css/tokens.css` and `tokens/tokens.json`, and the source's `globals.css`. #161 confirmed the value four times against the live Confluence page; the "known typo" comment in both repos is itself the error and is deleted.
- **Strip red defaults from the 11 held CSS files** listed in §1.4. Move chart and sparkline series to `--ds-chart-*`. `grid.css` keeps its red lines.
- Correct the two prose assertions #158 found: `llms.txt` hard-codes `accent #ff2a00`, and `docs/for-claude.md` restates the rule. Both false under #160.
- **The five in-place a11y fixes** (#166), each with a `<component>-regress.spec.ts` under #163 V4. All five are on held components, so they conflict with no absorption batch:

  | file | fix | size |
  | --- | --- | --- |
  | `RadioGroup.js` | default `name` to `React.useId()` — without it the radios are not one group and the **native** arrow keys silently stop working | 2 LOC |
  | `ColorPicker.js` | arrow keys across the swatch group | ~25 LOC |
  | `Calendar.js` | arrow-key navigation on the existing grid skeleton, then compose `DatePicker`/`DateRangePicker` onto it — the #164 cluster: three files, one behavioural change, **fixes three defects while deleting code** | ~30 LOC + the two pickers |
  | `Tree.js` | Up/Down/Left/Right/Home/End + roving `tabIndex` (it is `tabIndex: 0` on every item today, `Tree.js:55`) | ~35 LOC |
  | `DataGrid.js` | `role="grid"`/`row`/`gridcell` + roving cell focus, over the real `<table>`; must not collide with the edit handler at `:217` | ~70 LOC |

  Also resolve `Calendar.js`'s own contradiction — it comments that *"`aria-selected` is allowed on gridcell (`aria-pressed` is not)"* while `DatePicker.js` does exactly that.

---

## 4. The eight batches

Each batch: absorbs its components, **un-filters its own slugs in `registry.ts`** (0.2 defect D), **resolves every dedupe exception on the stylesheets it lands**, **re-wires its forward cross-batch imports**, emits its removed→replacement rows to `docs/migration/renames.json`, rewrites the hand-written docs pages teaching its classes, runs the gate route-filtered to its own routes, then publishes `1.0.0-beta.N` on `next`.

A batch does **not** strip `@layer utilities`. That is paid once upstream, on `migration-source-v1`.

### Dedupe exceptions — 36 owed across 31 files

Counted one per comment block: **51 exceptions across 43 files**, every one a Tailwind literal kept in place so `tailwind-merge` can dedupe a consumer override. **The target has no `tailwind-merge` and no Tailwind**, so an exception on a landing stylesheet must be **resolved** — the literal becomes a real declaration and the override becomes a class — never carried across.

**15 are free across 12 files**: `sidebar.css`'s 3 (the file never lands — only two cherry-picks do, §4 batch 8) plus 12 on held components (`calendar`, `command`, `date-picker`, `date-range-picker`, `dialog`, `dropdown-menu`, `file-upload`, `number-field`, `radio-group`, `tabs`, `tags-input`). The remaining **36 are owed**, and each batch carries its own count:

| batch | owed | files |
| --- | --- | --- |
| 1 | **2** | `navigation-menu`, `speed-dial` |
| 2 | **8** | `toc` (4), `bubble`, `message-scroller`, `resizable`, `separator` |
| 3 | **6** | `field-array` (2), `button-group.tsx`, `carousel`, `phone-input`, `wordmark` |
| 4 | **5** | `chart`, `donut-chart`, `pie-chart.css`, `pie-chart.tsx`, `stacked-bar` |
| 5 | **5** | `funnel-chart`, `radar-chart`, `scatter-chart`, `treemap`, `waterfall-chart` |
| 6 | **3** | `pagination`, `table`, `timeline` |
| 7 | **6** | `input-group` (2), `card`, `checkbox-group`, `select`, `textarea` |
| 8 | **1** | `sheet` |

Two of the 36 sit in TSX, not CSS (`button-group.tsx`, `pie-chart.tsx`); the other 34 are stylesheet comments. `tags-input.css`'s exception is the inverse case and is free only because `tags-input` holds — it records that the conversion *already* broke a dedupe against `button.css`.

### Forward cross-batch imports — 16 re-wirings, each paid twice

Beyond the four held-import re-wirings the plan already lists, **17 imports point forward** from an absorbed component to a component in a later batch. Sixteen have a target symbol to re-compose onto — `Button` (10), `Input` (3), `Select`, `Status`, `InputGroup` — so each is re-wired **twice**: onto the incumbent when its own batch lands, then back onto the source symbol when batch 7 (or batch 3, for `Separator`) supplies it. Same class of obligation as the held-import re-wirings, but the plan listed none of them.

| batch | forward imports |
| --- | --- |
| 1 | **2** — `speed-dial` → `Button`; `autocomplete` → `InputGroup` |
| 2 | **3** — `theme-switcher`, `message-scroller`, `attachment` → `Button` |
| 3 | **7** — `editable` → `Button` + `Input`; `field-array`, `icon-button`, `carousel` → `Button`; `phone-input` → `Input` + `Select` |
| 6 | **4** — `pagination` → `Button`; `toolbar` → `Button` + `Input`; `agenda` → `Status` |

The **seventeenth cannot be re-wired**: `item.tsx:7` imports `Separator`, and the target has no `Separator` component and no `.ds-separator` rule anywhere in `react/` or `css/`. Moving `separator` into batch 2 dissolves it — see §6's seventh cluster boundary — which is why batch 2 shows 3 above and not 4.

### Batch 1 — net-new overlays and menus · beta.1 · 6 comp · 2,031 LOC

`context-menu` 525 · `navigation-menu` 426 · `menubar` 370 · `autocomplete` 370 · `speed-dial` 214 · `hover-card` 126

All six land in a **clean namespace** — `ds-context-menu`, `ds-menubar` and the rest match zero selectors in the target's `css/`. Three arrived through #166's A4 alias withdrawals; `context-menu` is the one that would have quietly dropped right-click menus from the system.

Carries **7 of the 18 `z-index: 50` remaps** (`context-menu` 2, `hover-card` 2, `autocomplete` 1, `navigation-menu` 1, `speed-dial` 1) — the overlay family is where they concentrate.

**Re-wiring obligation:** `menubar` imports the source's `dropdown-menu`, which holds. Re-compose onto the target's `Dropdown`/`MenuItem`.

### Batch 2 — net-new content and media · beta.2 · 15 comp · 2,384 LOC

`attachment` 404 · `item` 365 · `bubble` 316 · `theme-switcher` 217 · `message-scroller` 216 · `message` 148 · `marker` 135 · `toc` 131 · `resizable` 102 · `scroll-area` 92 · `qr-code` 90 · `snippet` 67 · **`separator` 39** · `masonry` 34 · `aspect-ratio` 28

**`separator` moves here from batch 3** — the seventh cluster boundary (§6). `item.tsx:7` imports `Separator`, and unlike the other sixteen forward imports it has no target symbol to re-compose onto: the target has no `Separator` component and no `.ds-separator` rule. Both are net-new T1 additions in adjacent batches, so the move is a re-cut §2's ordering rule already permits and re-decides nothing.

`message-scroller` and `resizable` are **admit-CSS-only** — their stylesheets ship, their React bindings do not. Real landing LOC is **2,175** before the re-cut (the plan's ~2,197 subtracted `input-otp` from batch 3 but not `carousel`, and carried the slip here), **2,214** with `separator`. `@shadcn/react` and `react-resizable-panels` are not acquired.

**Re-wiring:** `theme-switcher` imports held `dropdown-menu` and `toggle-group` → re-compose onto `Dropdown`/`MenuItem` and `Segmented`. `snippet` imports held `code-block` → re-compose onto the target's `CodeBlock`.

### Batch 3 — net-new form controls and primitives · beta.3 · 15 comp · 1,801 LOC

`carousel` 303 · `relative-time` 179 · `input-otp` 171 · `editable` 169 · `phone-input` 157 · `button-group` 157 · `meter` 156 · `toggle` 138 · `field-array` 134 · `wordmark` 98 · `label` 53 · `icon-button` 37 · `form` 25 · `collapsible` 19 · `direction` 4

`separator` (39) has moved to batch 2; `button-group.tsx:6` imports it, so that import is now backward and free.

`carousel` and `input-otp` are **admit-CSS-only** — real landing LOC **1,536** before the re-cut (not the ~1,668 stated, which subtracted `input-otp` but not `carousel`), **1,497** after `separator` leaves. Neither correction crosses a batch-size threshold. `embla-carousel-react` and `input-otp` are not acquired. `meter`, `form` and `toggle` are A4 withdrawals landing clean; `label` is a partial admitting outright. `button-group`, `icon-button` and `wordmark` replace applier symbols but have **no target stylesheet at all**, so their CSS is an addition.

**`label.css` lands here**, and its opening comment explains a cascade bargain with Tailwind that no longer exists once the file is unlayered upstream ([#171](https://github.com/diamorval/design-system-diametral/issues/171)). Rewrite the comment on the way in; the `@layer components` block it describes merges into source order and its intent survives.

Carries **`phone-input.tsx`'s Tailwind literals** — one of the two files left of #157's "~180 across 33", the rest absorbed by `feat/css-conversion`.

### Batch 4 — chart substrate and replacement charts · beta.4 · 9 comp · 1,591 LOC

`chart` 532 · `donut-chart` 172 · `bar-chart` 155 · `sparkline` 151 · `gauge` 148 · `stacked-bar` 135 · `line-chart` 108 · `area-chart` 100 · `pie-chart` 90

**The tier inversion.** `chart` is T2 — its stylesheet replaces two target files — but it is the substrate of every chart in batches 4 and 5, so it comes first.

Carries **the chart merge** (§1.2): target `bar-chart.css` + `charts.css` deleted, source `chart.css` lands. Red leaves with those files, free. `sparkline`'s series move to `--ds-chart-*`.

Carries **`playwright.config.js:51`'s phantom reference** — it cites `tests/chart-marks.spec.ts`, which does not exist, and claims chart animation *"still has one gate that runs it for real"*. Write it or delete the comment; this is the batch that knows.

### Batch 5 — net-new charts · beta.5 · 8 comp · 1,889 LOC

`heatmap` 446 · `waterfall-chart` 286 · `bullet-chart` 242 · `funnel-chart` 211 · `treemap` 200 · `scatter-chart` 189 · `combo-chart` 184 · `radar-chart` 131

All eight compose batch 4's `ChartContainer`/`ChartLegend`/`ChartTooltip` and land in clean namespace. `recharts` is substrate, already paid.

### Batch 6 — wholesale replacements · beta.6 · 15 comp · 2,464 LOC

`stepper` 228 · `timeline` 227 · `avatar` 226 · `pagination` 223 · `agenda` 205 · `table` 185 · `breadcrumb` 180 · `empty` 178 · `toolbar` 164 · `banner` 160 · `progress` 155 · `page-header` 146 · `description-list` 76 · `kbd` 74 · `spinner` 37

The remaining 13 of the 20 wholesale-replaced stylesheets, plus two **cross-boundary pins**:

- **`stepper`** — its React goes to the source, but `stepper.css` is **held**: `Wizard` (held) renders the entire `.ds-stepper__marker`/`__label`/`__step` block. The source `Stepper` must render the target's classes. **Verify `Wizard` still renders before the gate.**
- **`table`** — no React component on either side; `table.css` replaces on its own. It does **not** replace cleanly: the target's `.ds-table--hover`, `__num`, `__name` and `__row-action` have readers in four `examples/` files plus `docs/components.md` and `docs/migration.md`. Re-class or preserve them; a wholesale swap breaks the committed fixtures the visual and a11y suites read.

Red leaves `progress`, `stepper` and `spinner` free.

**Ordering check — `kbd` before `input-group`** ([#171](https://github.com/diamorval/design-system-diametral/issues/171)). `kbd.css` is layered *on purpose* in the source so `InputGroupAddon`'s Tailwind utility keeps outranking it; unlayered, `background: var(--input)` wins instead — the inverse of the pre-conversion cascade. `kbd` lands here and `input-group` not until batch 7, so **that inversion ships in beta.6 and beta.7**. Either carry the addon override as a plain `.ds-input-group … .ds-kbd` rule with `kbd`, or accept it and fix it when `input-group` lands. Do not let it pass silently.

**One look owed** (#165 §6.2): `agenda` and `pagination` are ruled *source wins* on "incumbent is a class-applier", but both incumbents carry real derived logic — `Agenda` groups and sorts through a `useMemo`, `Pagination` computes windows through `range()`/`go()`. Whether the source is a strict superset needs reading, not measuring. If either turns out not to be, it holds and its stylesheet holds with it.

### Batch 7 — frozen contracts and the form-controls split · beta.7 · 16 comp · 2,715 LOC

`field` 425 · `select` 409 · `input-group` 345 · `button` 307 · `card` 175 · `badge` 147 · `panel` 136 · `slider` 128 · `status` 125 · `switch` 118 · `checkbox` 91 · `textarea` 85 · `tag` 82 · `input` 68 · `icon` 43 · `checkbox-group` 31

The highest-care batch: every class name here is fixed by a surface outside the package. Source CSS is absorbed **into** the existing contract — renamed into the frozen grammar, not replacing it.

**Frozen readers** (#165 §1): `<ds-badge>`, `<ds-button>`, `<ds-callout>`, `<ds-icon>`, `<ds-modal>`, `<ds-panel>`, `<ds-section-heading>`, `<ds-segmented>`, `<ds-status>`, `<ds-switch>`, `<ds-tabs>` — 17 literal classes across 16 files — plus Streamlit consumers reading `ds-card`, `ds-statgrid`, `ds-tag`, `ds-tag--success`, `ds-title`, `ds-title--xl` from **published `docs/streamlit.md`** — plus `ds-card--clickable` and `ds-card__media` (read by `react/components/Card.js`) and `ds-card__block`, which the original list omitted. Four families are **dynamic** (`ds-badge--`, `ds-button--`, `ds-callout--`, `ds-status--` are string-concatenated from a pass-through attribute), so the whole modifier family is frozen, not just the literal name.

Carries:
- **The `form-controls.css` seven-way split** (§1.3) — six readers out to source-named files, the radio block stays.
- **`.ds-input`'s rename propagation.** The four-way dedupe line item is **withdrawn** — [#169](https://github.com/diamorval/design-system-diametral/issues/169) measured it as **one-way**. `field.css` holds the only 8 declarations; `combobox.css` mentions the class in a file-header comment and defines nothing. What survives is a propagation obligation: five files carry descendant or child overrides that win on specificity, not load order — `color-picker.css:54`, `time-picker.css:13`, `toolbar.css:38`, `date-picker.css:16`, `date-range.css:17` — and every rename of `.ds-input` must reach all five. Still safe here and nowhere earlier.
- **`ds-open` and `ds-close`** — set by `ds-modal.js`, matched by no rule in `css/`. Dead classes in a frozen surface: implement or delete from the web component.
- **Lucide → Phosphor**, 8 files (§1.4), with `icon`.
- **`badge.css`'s red strip.**
- **2 of the 18 `z-index: 50` remaps** (`select`).

### Batch 8 — defect swaps · beta.8 · 5 comp · 1,528 LOC

`drawer` 550 · `kanban` 466 · `sheet` 292 · `tooltip` 195 · `skeleton` 25

The only batch that buys a dependency and the only one that changes behaviour on a contested component. Three swaps, each earned on a measured defect and each owing a `<component>-regress.spec.ts`:

| swap | the incumbent's defect |
| --- | --- |
| `tooltip` | `Tooltip.js` (42 LOC) renders `role="tooltip"` on a **sibling span with no `id` and no `aria-describedby` on the trigger**, so a screen reader never announces it; no Escape dismissal |
| `drawer` + `sheet` | `Drawer.js` (52 LOC) has Escape and `role=dialog`/`aria-modal` but **no focus trap and no portal** — and nothing in the target implements one to copy; `Modal` has the same gap. Two source components merge onto the target's one `Drawer` symbol: **this merge must land whole** |
| `kanban` | 49 LOC of HTML5 drag with **zero ARIA and no keyboard path at all**. Accessible DnD is a lift/move/drop state machine with live regions, not an `onKeyDown`. Arrives with **five committed Playwright tests, three of them keyboard** |

**`@dnd-kit/core` + `/sortable` + `/utilities` — the migration's entire new dependency bill**, for `kanban` alone.

Also carries:
- **`skeleton`** — React to the source, but `skeleton.css` is **held**: `DataGrid` renders `.ds-skeleton--text` for its loading rows. Same cross-boundary pin as `stepper`. **Verify `DataGrid`'s loading state before the gate.**
- **9 of the 18 `z-index: 50` remaps** (`drawer` 3, `sheet` 2, `tooltip` 4).
- **`sidebar`'s two cherry-picks** (#164 A3) — cookie-persisted collapse and `Cmd+B` onto `AppShell`. The other 23 composition parts do not port. Whatever of `sidebar.tsx`'s Tailwind literals the cherry-picks carry finishes #157's C7.
- **Re-class `examples/components/kanban.html`, `examples/demo/views/talent.js`, `examples/demo/views/work.js`** to flat kebab.
- **Generate the visual baselines**, on Linux, **at the last batch only** (#163 V5) — during absorption the pixels change by design, so a diff before this point flags the work. `visual.yml`'s `update_baselines` input and skip-when-absent step were built for exactly this.

---

## 5. Cutover to `1.0.0`

After batch 8 is green:

1. Full gate over all 119 routes × 2 themes, unfiltered, tiers 1–4 (a11y, keyboard, contract, integration). Tier 5 (visual) arms **after** 1.0.0.
2. **Assert `registry.ts` length equals the shipped component count** — 89 absorbed + 30 held. A component missing from the registry is invisible to the gate and to `docs/components.md`.
3. React 18 compile, **release-blocking** (#155) — the peer holds at `>= 18` and the source's `>=19` was never verified.
4. Generate the migration guide and CHANGELOG from the accumulated `docs/migration/renames.json`.
5. Merge `v1` to `main`, tag `v1.0.0`, publish to `latest`. **`latest` moves exactly once**, so every break lands inside one version — the clean break #159 chose, with no shim; `legacy-aliases.css` stays the sole alias file.
6. `pages.yml` deploys the docs site on that merge — the first moment the public docs describe a system `latest` can install.

Retirement of `@diametral/ui` is a **no-op**: it was never published to npm (404), so #154's dangling-`@import` defect needs no shipped fix and there is no installed base to shim for.

---

## 6. Cluster integrity — the hard boundaries

A re-cut may move anything except these. Each is a single behavioural or structural change that a batch boundary would break in half.

| cluster | why it cannot split |
| --- | --- |
| `chart` before the 8 net-new charts | `combo-chart.tsx:16` and kin import `./chart.js` |
| `drawer` + `sheet` | two source components onto one target `Drawer` symbol, one swap |
| `bar-chart.css` + `charts.css` ← `chart.css` | a merge; a half-merge leaves an orphan stylesheet |
| the `form-controls` seven-way split | one file's readers disagree; splitting the split unstyles someone |
| `Calendar` + `DatePicker` + `DateRangePicker` | one behavioural change across three files (batch 0.3) |
| `stepper` with `Wizard`, `skeleton` with `DataGrid` | cross-boundary pins — whoever moves the React must verify the held component still renders |
| `item` with `separator` | `item.tsx:7` imports `Separator` and the target has **no** `Separator` symbol and **no** `.ds-separator` rule, so the import cannot be re-composed onto an incumbent the way the other sixteen forward imports can. `separator` therefore sits in batch 2 with `item`, not batch 3 |

---

## 7. Where every inherited task landed

| task | source | batch |
| --- | --- | --- |
| `@layer utilities` strip, **111** files | #157 · #171 | **upstream, once** — on `migration-source-stripped`, tagged `migration-source-v1`. No batch task. The 0.1 CI check survives as an invariant guard |
| dedupe exceptions, **36 owed** of 51 | #157 · #169 | **every batch**: B1 2 · B2 8 · B3 6 · B4 5 · B5 5 · B6 3 · B7 6 · B8 1 |
| forward cross-batch import re-wirings, **16** | #169 | **B1** (2) · **B2** (3) · **B3** (7) · **B6** (4), each unwound again when the source symbol lands |
| `registry.ts` filtered to migrated components | #173 | **0.2**, un-filtered per batch — a correctness requirement, not an optimisation |
| remove `App.tsx:20`'s catch-all redirect | #173 | **0.2** — without it tier 1 passes green on a missing page |
| `z-index: 50` remap, 18 rules | #157 | **B1** (7) · **B7** (2) · **B8** (9) |
| Tailwind literals, 2 files | #157 | **B3** (`phone-input`) · **B8** (`sidebar` cherry-picks) |
| shadcn slot-layer deletion (C5) + red-strip one-liner | #157 | **0.3** |
| the eight-step docs-site move | #158 | **0.2** |
| `components.md` generator | #158 | **0.2** |
| `llms.txt` / `for-claude.md` accent corrections | #158 | **0.3** |
| `renames.json` rows | #159 | **every batch** |
| stale `RELEASE.md` / `installation.md` blocks; `versioning.md` blocker ¶ | #159 | **0.1** |
| ADR naming Base UI as substrate | #155 | **0.1** |
| `kanban-regress.spec.ts:50` un-hardcode + `test:regress` | #163 | **0.1** |
| keyboard regress spec per defect-swap | #163 | **B8** (3 swaps) · **0.3** (5 in-place fixes) |
| `variants.json` extraction, cache deletion | #163 | **0.1** |
| `web-components.html` into the a11y spec | #163 | **0.1** |
| port the `package` CI job + component-class assertion | #163 | **0.1** |
| visual baselines on Linux | #163 | **B8** |
| CI worker count + per-test timeout | #163 | **0.1** |
| phantom `tests/chart-marks.spec.ts` | #163 | **B4** |
| the `calendar` cluster | #164 | **0.3** |
| `DataGrid` arrow keys | #164 | **0.3** |
| re-class the three `examples/` files | #164 | **B8** |
| `AppShell` cookie-collapse + `Cmd+B` | #164 | **B8** |
| registry membership | #163 V2 | **every batch**; held components seeded in **0.2** |

---

## 8. What this plan does not decide

Nothing on the route. Three items are deliberately left to the batch that has the evidence:

1. **`agenda` and `pagination`** (#165 §6.2) — read them in batch 6; if either incumbent is not an applier, it holds, exactly as `stat-card` did.
2. **`ds-open` / `ds-close`** — implement or delete, in batch 7, by whoever reads `ds-modal.js`.
3. **`tests/chart-marks.spec.ts`** — write it or delete the comment, in batch 4.

Each is a one-line call by the executing agent, not a decision the map owes. **The way to the destination is clear.**
