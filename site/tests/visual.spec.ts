// Visual regression gate for @diametral/ui.
//
// Deliberately a curated set, not all 72 routes. Two reasons:
//
// 1. Cost. 72 routes x 2 themes is 144 full-page baselines; at typical
//    full-page size that is tens of megabytes of PNGs in git, re-churned on
//    every intentional design change. The a11y suite is the one that covers
//    every route, because it needs no committed artefact.
// 2. Signal. These routes were picked to exercise the *visual language* rather
//    than component count: the flat 1px rules, zero radius, the eight-colour
//    tone axis, dense data display, overlay layering and chart palettes. A
//    regression in any of those shows up here; a regression that shows up only
//    on, say, /docs/aspect-ratio is not a brand regression.
//
// Add a route below when it covers a visual property nothing else does.

import { expect, test } from "@playwright/test"

import { expectTheme, pinTheme, settle, THEMES, type Route } from "./harness"

const ROUTES: Route[] = [
  { name: "overview", path: "/" },
  { name: "showcase", path: "/showcase" },
  // Tone axis + variant matrix: the densest colour surface in the system.
  { name: "button", path: "/docs/button" },
  { name: "badge", path: "/docs/badge" },
  // Surfaces and 1px rules.
  { name: "card", path: "/docs/card" },
  { name: "item", path: "/docs/item" },
  // Form controls: borders, focus rings, invalid states.
  { name: "field", path: "/docs/field" },
  { name: "input-group", path: "/docs/input-group" },
  { name: "select", path: "/docs/select" },
  // Dense data display, tabular numerals.
  { name: "table", path: "/docs/table" },
  { name: "data-table", path: "/docs/data-table" },
  // Chart palette + grid treatment.
  { name: "chart", path: "/docs/chart" },
  // Overlay layering and scrims.
  { name: "dialog", path: "/docs/dialog" },
  { name: "dropdown-menu", path: "/docs/dropdown-menu" },
  // App chrome.
  { name: "sidebar", path: "/docs/sidebar" },
  { name: "tabs", path: "/docs/tabs" },
  // Date surfaces: the most grid-heavy component.
  { name: "calendar", path: "/docs/calendar" },
]

// Neutralise anything that would make a screenshot flake: in-flight animation,
// transitions, and the blinking caret. Injected after load so it wins on
// specificity and ordering.
const STABILIZE_CSS = `
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    caret-color: transparent !important;
  }
`

for (const theme of THEMES) {
  test.describe(`visual · ${theme}`, () => {
    for (const { name, path } of ROUTES) {
      test(`${name} (${theme})`, async ({ page }) => {
        await pinTheme(page, theme)
        await page.goto(path)
        await settle(page)
        await expectTheme(page, theme)
        await page.addStyleTag({ content: STABILIZE_CSS })
        await expect(page).toHaveScreenshot(`${name}-${theme}.png`, {
          fullPage: true,
        })
      })
    }
  })
}
