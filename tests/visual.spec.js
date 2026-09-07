// Visual regression tests for the Diametral Design System showcase.
//
// For each key showcase page we navigate, wait for the network to settle and
// for web fonts to finish loading, neutralize animations/transitions/caret
// (so screenshots are deterministic), then assert a full-page screenshot
// matches the committed baseline in tests/__screenshots__/.
//
// Note: charts/datagrid/react pages import React from esm.sh at runtime, so
// network access is required for those to render.

import { test, expect } from "@playwright/test";

// Pages are addressed relative to the configured baseURL (http://localhost:8080).
// `name` is used for the snapshot filename, so keep these stable.
// Issue #31 moved the hand-written pages: the home page to the repo root and
// examples/components/ to examples/css/, freeing examples/components/ for the
// generator-owned React pages. The `name` keys are the snapshot filenames and
// stay as they were, so the baselines keep their identity across the move.
const PAGES = [
  { name: "index", path: "/index.html" },
  { name: "kitchen-sink", path: "/examples/kitchen-sink.html" },
  { name: "theming", path: "/examples/theming.html" },
  { name: "components-buttons", path: "/examples/css/buttons.html" },
  { name: "components-status-panel", path: "/examples/css/status-panel.html" },
  { name: "components-datagrid", path: "/examples/css/datagrid.html" },
  { name: "components-charts", path: "/examples/css/charts.html" },
  { name: "components-forms", path: "/examples/css/forms.html" },
  { name: "components-calendar-view", path: "/examples/css/calendar-view.html" },
  { name: "components-modal", path: "/examples/css/modal.html" },
  { name: "templates-login", path: "/examples/templates/login.html" },
  { name: "templates-dashboard", path: "/examples/templates/dashboard.html" },
];

// Kill anything that would make a screenshot flake: in-flight animations,
// transitions, and the blinking text caret.
const STABILIZE_CSS = `
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    caret-color: transparent !important;
  }
`;

for (const { name, path } of PAGES) {
  test(name, async ({ page }) => {
    const response = await page.goto(path);

    // A 404 renders a viewport-sized error page, which is a perfectly stable
    // screenshot -- so without this the suite reports a pixel diff rather than
    // a missing route, and a page that moved reads as a page that restyled.
    expect(response?.status(), `${path} did not serve`).toBe(200);

    // Wait for runtime-loaded resources (e.g. React from esm.sh) and fonts.
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);

    // Inject the stabilizing stylesheet after content has loaded so it wins.
    await page.addStyleTag({ content: STABILIZE_CSS });

    // Pin the document to an integral height before capturing.
    //
    // A full-page screenshot is rejected outright on a size mismatch — no
    // maxDiffPixelRatio applies — and Playwright requires two consecutive
    // captures of the same size. kitchen-sink is 12,738px tall and something in
    // it has a fractional height, so consecutive layout passes rounded to
    // 12737 and 12738 alternately and the assertion could never converge:
    // deterministic, not flaky, and neither a retry nor a longer timeout
    // touches it. Writing the height back once makes both passes agree.
    //
    // scrollHeight, not the bounding rect: a full-page capture is sized by the
    // scrollable area, and on a page whose content overflows the root box the
    // two disagree -- pinning the rect height leaves the capture free to wobble.
    await page.evaluate(() => {
      document.documentElement.style.height = `${document.documentElement.scrollHeight}px`;
    });

    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });
}
