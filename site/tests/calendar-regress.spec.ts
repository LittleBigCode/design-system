// The Calendar/DatePicker/DateRangePicker cluster shared a day grid by
// duplication, and the three copies had drifted into three different states:
//
//   - both pickers put aria-pressed on role="gridcell", which is invalid ARIA
//     and is what failed the axe gate;
//   - both pickers emitted gridcells as direct children of the grid, with no
//     role="row" between them, even though their CSS already shipped the
//     display:contents row rule;
//   - all three had no arrow-key navigation, and the pickers made all 42 days
//     tab stops.
//
// One shared grid now backs all three, so these assertions run over every route
// in the cluster rather than being written three times.

import { expect, test } from "@playwright/test"

import { routePath, settle } from "./harness"

const ROUTES = [
  { slug: "calendar", grid: ".ds-monthview__grid" },
  { slug: "date-picker", grid: ".ds-calendar__grid" },
  { slug: "date-range-picker", grid: ".ds-calendar__grid" },
]

/** Open the popover the pickers keep their grid inside. Calendar is always up. */
async function reveal(page: any, slug: string) {
  if (slug === "calendar") return
  await page.locator(".ds-input[aria-haspopup], .ds-input").first().click()
  await page.locator(".ds-calendar__grid").first().waitFor()
}

for (const { slug, grid } of ROUTES) {
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
          (cell) => cell.parentElement?.getAttribute("role") !== "row"
        ).length
      )
      expect(orphans).toBe(0)
    })

    test("the month is a single tab stop", async ({ page }) => {
      const stops = await page
        .locator(grid)
        .first()
        .locator('[role="gridcell"]')
        .evaluateAll((els) =>
          els.filter((el) => (el as HTMLElement).tabIndex === 0)
        )
      expect(stops).toHaveLength(1)
    })

    test("ArrowRight moves one day and ArrowDown one week", async ({
      page,
    }) => {
      const cells = page.locator(grid).first().locator('[role="gridcell"]')
      const labels = await cells.evaluateAll((els) =>
        els.map((el) => el.getAttribute("aria-label"))
      )
      const start = await cells.evaluateAll((els) =>
        els.findIndex((el) => (el as HTMLElement).tabIndex === 0)
      )

      await cells.nth(start).focus()
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
