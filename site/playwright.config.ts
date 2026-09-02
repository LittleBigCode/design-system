// Playwright config for the @diametral/design-system quality gates.
//
// The docs app is the harness; the subject under test is the component library.
// Every component has a route (/docs/<slug>) and a live playground, so driving
// the docs app exercises the real components rather than fixtures written for
// the tests.
//
// Tests run against `vite preview` (a production build), not the dev server, so
// what is measured is what consumers get: minified output, no HMR runtime, and
// the same Tailwind pass that ships.

import { defineConfig } from "@playwright/test"

const PORT = 4173

export default defineConfig({
  testDir: "tests",

  // Baselines are grouped per spec file and are deliberately NOT keyed by
  // OS/arch: CI (Linux) must match what is committed. See tests/README.md —
  // baselines have to be generated on Linux for that to hold.
  snapshotPathTemplate: "tests/__screenshots__/{testFilePath}/{arg}{ext}",

  // Sub-pixel font rendering and anti-aliasing move a little between runs.
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },

  // Fail the run if someone commits a .only
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["html"], ["list"]] : [["list"]],

  // The 8 failures in the 240-test run were all load timeouts rather than axe
  // violations, so the per-test budget is well above Playwright's 30 s default
  // and CI gets a fixed worker count instead of a core-count guess.
  timeout: 90_000,
  workers: process.env.CI ? 2 : undefined,

  webServer: {
    // Build then serve. reuseExistingServer lets a local `npm run preview`
    // stand in so the suite does not rebuild on every invocation.
    command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
    // Vite's `base` means the SPA lives under the workbench subpath, so the
    // origin root is a 404 and would never report ready.
    url: `http://localhost:${PORT}/design-system/react-workbench/`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },

  use: {
    baseURL: `http://localhost:${PORT}`,
    // Deterministic rendering: fixed viewport and 1x scale.
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
    // Recharts animates in JavaScript, so the `animation: none` CSS the visual
    // suite injects cannot stop it and a screenshot would land on an arbitrary
    // frame. Reduced motion is the switch recharts itself reads, and it settles
    // charts on their final frame. tests/chart-marks.spec.ts opts back out, so
    // the animation still has one gate that runs it for real.
    contextOptions: { reducedMotion: "reduce" },
  },

  // One Chromium project keeps baselines stable and CI fast.
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
})
