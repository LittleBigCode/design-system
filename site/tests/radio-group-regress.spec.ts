// RadioGroup's `name` was optional with no default, so a group rendered without
// one produced radios the browser did not consider related: each was its own
// group of one. Arrow keys did nothing and a second selection did not clear the
// first, while role="radiogroup" kept announcing a group that did not work.

import { expect, test } from "@playwright/test"

import { routePath, settle } from "./harness"

test.describe("radio group without an explicit name", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routePath("/docs/radio-group"))
    await settle(page)
  })

  test("every radio in a group shares one name", async ({ page }) => {
    const names = await page
      .locator('.ds-radio-group')
      .first()
      .locator('input[type="radio"]')
      .evaluateAll((els) => els.map((el) => (el as HTMLInputElement).name))

    expect(names.length).toBeGreaterThan(1)
    expect(new Set(names).size).toBe(1)
    expect(names[0]).not.toBe("")
  })

  test("arrow keys move the selection, and only one radio stays checked", async ({
    page,
  }) => {
    const radios = page
      .locator(".ds-radio-group")
      .first()
      .locator('input[type="radio"]:not([disabled])')

    await radios.first().focus()
    await page.keyboard.press("ArrowDown")

    const checked = await radios.evaluateAll((els) =>
      els.map((el) => (el as HTMLInputElement).checked)
    )
    expect(checked.filter(Boolean)).toHaveLength(1)
    // The arrow moved off the first radio rather than being swallowed.
    expect(checked[0]).toBe(false)
  })
})
