// A horizontal stepper is laid out by the flex shrink algorithm, which failed in
// two places at once when the rail was narrower than the steps: `flex-1`
// separators collapsed to 0px (no connector lines), then `shrink-0` items
// refused to give and spilled over the props panel beside them.

import { expect, test } from "@playwright/test"

import { settle } from "./harness"
import { routePath } from "./harness"

const STEPPER = '[data-slot="stepper"][data-orientation="horizontal"]'

// The workbench rail is the narrowest place a stepper renders on the docs site.
test.describe("horizontal stepper in a narrow rail", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 })
    await page.goto(routePath("/docs/stepper"))
    await settle(page)
  })

  test("steps that do not fit are contained, not painted over the neighbour", async ({
    page,
  }) => {
    const uncontained = await page.evaluate((STEPPER) => {
      return [...document.querySelectorAll(STEPPER)]
        .filter((s) => s.scrollWidth > s.clientWidth)
        .filter((s) => getComputedStyle(s).overflowX === "visible")
        .map((s) => `${s.scrollWidth} of content in ${s.clientWidth} of rail`)
    }, STEPPER)
    expect(uncontained).toEqual([])
  })

  test("connectors stay visible when the row is squeezed", async ({ page }) => {
    const widths = await page.evaluate(
      (STEPPER) =>
        [
          ...document.querySelectorAll(
            `${STEPPER} [data-slot="stepper-separator"]`
          ),
        ].map((s) => Math.round(s.getBoundingClientRect().width)),
      STEPPER
    )
    expect(widths.length).toBeGreaterThan(0)
    expect(Math.min(...widths)).toBeGreaterThan(0)
  })
})
