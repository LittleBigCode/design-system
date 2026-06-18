// Playwright config for the Diametral Design System visual regression suite.
//
// The design system is buildless: the showcase in examples/ is served as plain
// static files. We start a static server with Python and compare full-page
// screenshots of key showcase pages against committed baselines.
//
// ESM module: package.json declares "type": "module", so we use `export default`.

import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",

  // Group all baselines under tests/__screenshots__/ (one folder per spec file),
  // independent of the OS/arch so CI on Linux matches what's committed.
  snapshotPathTemplate: "tests/__screenshots__/{testFilePath}/{arg}{ext}",

  // Allow a touch of noise (anti-aliasing, sub-pixel font rendering) before failing.
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },

  // Serve the repo root statically; pages live under /examples/...
  // reuseExistingServer lets you keep a `npm run serve` running locally.
  webServer: {
    command: "python3 -m http.server 8080",
    url: "http://localhost:8080/examples/index.html",
    reuseExistingServer: true,
    timeout: 60_000,
  },

  use: {
    baseURL: "http://localhost:8080",
    // Deterministic rendering: fixed viewport + 1x scale so screenshots are
    // reproducible across machines.
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
  },

  // Single Chromium project keeps baselines stable and CI fast.
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
});
