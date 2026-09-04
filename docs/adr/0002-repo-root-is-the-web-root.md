# ADR 0002 — The repo root is the web root; the React workbench takes a subpath

- **Status:** Accepted
- **Date:** 2026-09-02
- **Decided by:** Batch 0.2 execution ([#5](https://github.com/LittleBigCode/design-system/issues/5)), overriding defect **B** as recorded
- **Applies from:** the next `pages.yml` deploy

## Context

This package is buildless, and its published layout **is** its served layout. `pages.yml`
copies `css/ assets/ components/ examples/ emails/ dist/` into `_site/` verbatim, so
`examples/index.html` reaches its stylesheet as `../css/diametral.css` — the same relative
path a consumer uses after `npm i`. `playwright.config.js` states the property outright:
"The design system is buildless: the showcase in `examples/` is served as plain…".

That is why the showcase is a **consumer test** and not a demo. It cannot cheat: no bundler
alias, no source import, no dev-only shim. If `css/diametral.css` is broken, the page is
broken. Before batch 0.2, `deploy/pages-redirect.html` was the root index and sent `/` to
`/examples/index.html`.

Batch 0.2 brought in `site/`, a Vite + React SPA — the first artifact here that cannot be
viewed without a build step. [#163](https://github.com/diamorval/design-system-diametral/issues/163)'s
V10 makes it load-bearing, because static HTML cannot exercise the TSX layer and batches 1+
need a React harness to be verifiable.

Defect **B** in #5 resolved the resulting root collision by deleting the redirect and
`deploy/pages-redirect.html`, giving `/` to the SPA: "Delete the line and
`deploy/pages-redirect.html` — do not reorder around them."

## Decision

**The buildless showcase keeps `/`. The React app mounts at `/react-workbench/` and is a
verification harness, not the docs site.** `deploy/pages-redirect.html` is restored and its
copy step returns to `pages.yml`.

## Consequences

- V10 is satisfied in full. `site/` still builds in CI, still gates every batch, still can
  never be dropped or excluded. Only its URL and its framing change.
- The property that made the showcase load-bearing survives. Had the SPA taken `/`, the
  canonical entry point to the design system would have been the one surface that needs a
  bundler to render — inverting what `docs/principles.md` says the system is.
- Two authoring models keep separate coverage, which is the actual reason both harnesses
  exist: `examples/*.html` exercises `.ds-*` classes, `--ds-*` tokens and the `ds-*` web
  components from plain HTML (the surface `docs/for-claude.md` generates against);
  `site/` exercises `react/components/*` through the `exports` map.
- `_site/404.html` is copied from the **workbench** index, not the root index. GitHub Pages
  serves the site-root `404.html` for unmatched paths at any depth, so a subpath SPA must
  still own that one file for its deep links to survive a reload. This works only because
  Vite's `base` makes the workbench's asset URLs absolute.
- Defect **B**'s deletion is **not** performed. Anything reading #5 or `batch-plan.md`'s
  defect table will find an instruction this ADR overrides. The `docs/absorption/*.md`
  ledgers are copies carrying provenance headers and are deliberately left untouched;
  the correction belongs at the source, in
  [#173](https://github.com/diamorval/design-system-diametral/issues/173).
- The base path lives in exactly three places — `site/vite.config.ts` (`base`),
  `site/playwright.config.ts` (readiness URL) and `site/tests/harness.ts` (`BASE`).
  `App.tsx` derives the router basename from `import.meta.env.BASE_URL`.

## Alternatives rejected

- **SPA at `/`, showcase demoted to a noindexed fixture path** (defect B as written). Cheapest,
  and it was the recorded plan. Rejected because it makes the bundler-dependent surface the
  system's front door.
- **Move `examples/` under `tests/fixtures/`.** Breaks the `../css/diametral.css` and
  `../../assets/fonts/ufficio.css` hrefs in all 14+ HTML files, which resolve only while those
  files sit one level under the web root — and with them the whole consumer-test property.
- **Port the 14 fixture pages into `site/` as routes.** One site, but the SPA cannot host
  buildless HTML without a passthrough plugin, and every visual baseline would be regenerated.
