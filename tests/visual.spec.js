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

  // The 17 curated routes the retired React docs app's visual.spec.ts used,
  // picked to exercise the visual language rather than component count: tone
  // axis, 1px rules, form controls, dense data, chart palette, overlay
  // layering, app chrome, date grids. Of the 17, "overview" and "showcase"
  // have no root equivalent (that app's SPA landing/index routes) and are
  // already covered above by "index" and "kitchen-sink"; the other 15 map
  // onto the generated component pages (examples/components/<slug>.html) by
  // slug.
  { name: "button", path: "/examples/components/button.html" },
  { name: "badge", path: "/examples/components/badge.html" },
  { name: "card", path: "/examples/components/card.html" },
  { name: "item", path: "/examples/components/item.html" },
  { name: "field", path: "/examples/components/field.html" },
  { name: "input-group", path: "/examples/components/input-group.html" },
  { name: "select", path: "/examples/components/select.html" },
  { name: "table", path: "/examples/components/table.html" },
  { name: "data-table", path: "/examples/components/data-table.html" },
  { name: "chart", path: "/examples/components/chart.html" },
  { name: "dialog", path: "/examples/components/dialog.html" },
  { name: "dropdown-menu", path: "/examples/components/dropdown-menu.html" },
  { name: "sidebar", path: "/examples/components/sidebar.html" },
  { name: "tabs", path: "/examples/components/tabs.html" },
  { name: "calendar", path: "/examples/components/calendar.html" },
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

    // Pin the root to a height at least as tall as the layout before capturing.
    //
    // A full-page screenshot is rejected outright on a size mismatch — no
    // maxDiffPixelRatio applies — and Playwright requires two consecutive
    // captures of the same size. Pages here have fractional heights, so
    // consecutive layout passes round differently and the assertion can never
    // converge: deterministic, not flaky, and neither a retry nor a longer
    // timeout touches it. Writing a definite height back once settles it.
    //
    // The max of both measures, because they disagree in opposite directions
    // and each alone leaves one page floating. The bounding rect is the root
    // BOX; scrollHeight is the scrollable AREA, which is what sizes a full-page
    // capture. On kitchen-sink the box is the fractional one, so the rect needs
    // the ceil (12790, and 12789 without it). On theming the content overflows
    // the box, so the rect reads short and only scrollHeight covers it (981,
    // and 979 without it). Both failures are the same shape — a pin too short
    // for the real layout — so the pin has to clear whichever measure is
    // taller. Measured on Linux; neither reproduces on macOS.
    await page.evaluate(() => {
      const root = document.documentElement;
      root.style.height = `${Math.max(
        Math.ceil(root.getBoundingClientRect().height),
        root.scrollHeight
      )}px`;
    });

    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });
}
