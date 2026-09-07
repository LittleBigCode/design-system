// The Calendar/DatePicker/DateRangePicker cluster shared a hand-rolled day
// grid by duplication, and the three copies had drifted into three different
// states:
//
//   - both pickers put aria-pressed on role="gridcell", which is invalid ARIA
//     and is what failed the axe gate;
//   - both pickers emitted gridcells as direct children of the grid, with no
//     role="row" between them, even though their CSS already shipped the
//     display:contents row rule;
//   - all three had no arrow-key navigation, and the pickers made all 42 days
//     tab stops.
//
// Batch 13 (#46) replaced all three with react-day-picker, which owns this
// grid natively — a real <table role="grid"> of <tr>s (implicit role="row",
// no explicit attribute needed) of <td role="gridcell">s, one true tab stop,
// and its own arrow-key handling. These assertions now cover the swap rather
// than the bug: they'd catch a regression back to gridcells with no row, or a
// `<CalendarDayButton>` override that reintroduces aria-pressed.

import { expect, test } from "@playwright/test"

import { routePath, settle } from "./harness"

const ROUTES = ["calendar", "date-picker", "date-range-picker"]
const GRID = ".ds-calendar-month-grid"

/** Open the popover the pickers keep their grid inside. Calendar is always up. */
async function reveal(page: any, slug: string) {
  if (slug === "calendar") return
  await page.locator('button[aria-haspopup="dialog"]').first().click()
  await page.locator(GRID).first().waitFor()
}

for (const slug of ROUTES) {
  test.describe(`${slug} day grid`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(routePath(`/docs/${slug}`))
      await settle(page)
      await reveal(page, slug)
    })

    test("no gridcell carries aria-pressed", async ({ page }) => {
      const offenders = await page
        .locator('[role="gridcell"][aria-pressed]')
        .count()
      expect(offenders).toBe(0)
    })

    test("every gridcell sits inside a row", async ({ page }) => {
      const orphans = await page.evaluate(() =>
        Array.from(document.querySelectorAll('[role="gridcell"]')).filter(
          (cell) => cell.parentElement?.tagName !== "TR"
        ).length
      )
      expect(orphans).toBe(0)
    })

    test("the month is a single tab stop", async ({ page }) => {
      const stops = await page
        .locator(GRID)
        .first()
        .locator('[role="gridcell"] button')
        .evaluateAll((els) =>
          els.filter((el) => (el as HTMLElement).tabIndex === 0)
        )
      expect(stops).toHaveLength(1)
    })

    test("ArrowRight moves one day and ArrowDown one week", async ({
      page,
    }) => {
      const buttons = page.locator(GRID).first().locator('[role="gridcell"] button')
      const labels = await buttons.evaluateAll((els) =>
        els.map((el) => el.getAttribute("aria-label"))
      )
      const start = await buttons.evaluateAll((els) =>
        els.findIndex((el) => (el as HTMLElement).tabIndex === 0)
      )

      await buttons.nth(start).focus()
      await page.keyboard.press("ArrowRight")
      expect(
        await page.evaluate(() =>
          document.activeElement?.getAttribute("aria-label")
        )
      ).toBe(labels[start + 1])

      await page.keyboard.press("ArrowDown")
      expect(
        await page.evaluate(() =>
          document.activeElement?.getAttribute("aria-label")
        )
      ).toBe(labels[start + 8])
    })
  })
}
