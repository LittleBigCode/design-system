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
const PAGES = [
  { name: "index", path: "/examples/index.html" },
  { name: "kitchen-sink", path: "/examples/kitchen-sink.html" },
  { name: "theming", path: "/examples/theming.html" },
  { name: "components-buttons", path: "/examples/components/buttons.html" },
  { name: "components-status-panel", path: "/examples/components/status-panel.html" },
  { name: "components-datagrid", path: "/examples/components/datagrid.html" },
  { name: "components-charts", path: "/examples/components/charts.html" },
  { name: "components-forms", path: "/examples/components/forms.html" },
  { name: "components-calendar-view", path: "/examples/components/calendar-view.html" },
  { name: "components-modal", path: "/examples/components/modal.html" },
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
    await page.goto(path);

    // Wait for runtime-loaded resources (e.g. React from esm.sh) and fonts.
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);

    // Inject the stabilizing stylesheet after content has loaded so it wins.
    await page.addStyleTag({ content: STABILIZE_CSS });

    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });
}
