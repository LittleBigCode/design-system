// The swatch grid was eleven separate tab stops and no arrow keys, so reaching
// the hex field below it meant pressing Tab eleven times and picking a colour
// from the keyboard meant counting them.

import { expect, test } from "@playwright/test"

import { routePath, settle } from "./harness"

const SWATCHES = ".ds-colorpicker__swatches"
const SWATCH = ".ds-colorpicker__swatch"

test.describe("colour swatch group keyboard navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routePath("/docs/color-picker"))
    await settle(page)
  })

  test("the swatch group is a single tab stop", async ({ page }) => {
    const group = page.locator(SWATCHES).first()
    const stops = await group
      .locator(SWATCH)
      .evaluateAll((els) => els.map((el) => (el as HTMLElement).tabIndex))

    expect(stops.length).toBeGreaterThan(1)
    expect(stops.filter((t) => t === 0)).toHaveLength(1)
  })

  test("the tab stop is the selected swatch", async ({ page }) => {
    const group = page.locator(SWATCHES).first()
    const rows = await group.locator(SWATCH).evaluateAll((els) =>
      els.map((el) => ({
        tabIndex: (el as HTMLElement).tabIndex,
        pressed: el.getAttribute("aria-pressed"),
      }))
    )
    const stop = rows.find((r) => r.tabIndex === 0)
    expect(stop?.pressed).toBe("true")
  })

  test("arrows move focus and carry the selection with them", async ({
    page,
  }) => {
    const group = page.locator(SWATCHES).first()
    const swatches = group.locator(SWATCH)
    const before = await swatches.evaluateAll((els) =>
      els.findIndex((el) => el.getAttribute("aria-pressed") === "true")
    )

    await swatches.nth(before).focus()
    await page.keyboard.press("ArrowRight")

    const after = await swatches.evaluateAll((els) =>
      els.findIndex((el) => el.getAttribute("aria-pressed") === "true")
    )
    expect(after).toBe(before + 1)

    const focusedLabel = await page.evaluate(() =>
      document.activeElement?.getAttribute("aria-label")
    )
    expect(await swatches.nth(after).getAttribute("aria-label")).toBe(
      focusedLabel
    )
  })

  test("the arrows wrap rather than dead-ending", async ({ page }) => {
    const swatches = page.locator(SWATCHES).first().locator(SWATCH)
    const count = await swatches.count()

    await swatches.first().focus()
    await page.keyboard.press("ArrowLeft")

    const focusedLabel = await page.evaluate(() =>
      document.activeElement?.getAttribute("aria-label")
    )
    expect(await swatches.nth(count - 1).getAttribute("aria-label")).toBe(
      focusedLabel
    )
  })
})
