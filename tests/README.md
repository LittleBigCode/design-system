# Visual regression tests

Full-page screenshot tests for the Diametral Design System showcase, powered by
[Playwright](https://playwright.dev/). They guard against unintended visual
changes to the CSS, tokens, and Web Components by comparing rendered showcase
pages against committed baseline images.

The design system itself stays dependency-free for consumers — Playwright is a
**devDependency** used only for testing and never ships in the published
package.

## How it works

- `playwright.config.js` starts a static file server (`python3 -m http.server
  8080`) at the repo root, so the buildless showcase in `examples/` is served as
  plain files (pages live at `http://localhost:8080/examples/...`). If you
  already have a server running (`npm run serve`), it is reused.
- `tests/visual.spec.js` visits a curated set of key pages (`index`,
  `kitchen-sink`, `theming`, and a representative spread of components +
  templates). For each page it:
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
