// A horizontal stepper is laid out by the flex shrink algorithm, which failed in
// two places at once when the rail was narrower than the steps: the connectors
// collapsed to nothing, then the steps refused to give and spilled over the
// props panel beside them.
//
// Rewritten in 1.0.0-beta.6, when the React binding was replaced. The
// requirement is unchanged; the mechanism is not. `stepper.css` is a
// cross-boundary pin — `Wizard` renders the whole .ds-stepper__step / __marker /
// __label block and does not move in this migration — so the absorbed `Stepper`
// renders 0.11's classes, and the connector is a `::after` on the step rather
// than a `<StepperSeparator>` element. A pseudo-element cannot be measured with
// getBoundingClientRect, so it is read out of getComputedStyle instead.

import { expect, test } from "@playwright/test"

import { routePath, settle } from "./harness"

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
    const connectors = await page.evaluate((STEPPER) => {
      // Per rail, not across the page: each stepper's own last step draws no
      // connector, because there is nothing after it to reach.
      return [...document.querySelectorAll(STEPPER)].flatMap((rail) =>
        [...rail.querySelectorAll(".ds-stepper__step")]
          .slice(0, -1)
          .map((step) => {
            const after = getComputedStyle(step, "::after")
            return {
              drawn: after.content !== "none",
              width: parseFloat(after.width) || 0,
              painted: after.backgroundColor !== "rgba(0, 0, 0, 0)",
            }
          })
      )
    }, STEPPER)

    expect(connectors.length).toBeGreaterThan(0)
    expect(connectors.every((c) => c.drawn)).toBe(true)
    expect(connectors.every((c) => c.painted)).toBe(true)
    expect(Math.min(...connectors.map((c) => c.width))).toBeGreaterThan(0)
  })

  test("the rail is not a tab stop it has no content to justify", async ({
    page,
  }) => {
    // The source made it one, against axe's scrollable-region-focusable. The
    // held stylesheet shrinks the row rather than scrolling it, so the stop
    // would have led nowhere.
    const tabIndexes = await page.evaluate(
      (STEPPER) =>
        [...document.querySelectorAll(STEPPER)].map((s) =>
          s.getAttribute("tabindex")
        ),
      STEPPER
    )
    expect(tabIndexes.every((t) => t === null)).toBe(true)
  })
})

// The cross-boundary pin, verified from the other side: whoever moves the
// React must confirm the held component still renders. This is a gate
// precondition for batch 6, not an afterthought.
test.describe("Wizard still renders the stepper block it pins", () => {
  test("the wizard's own steps carry the 0.11 grammar and paint", async ({
    page,
  }) => {
    await page.goto(routePath("/docs/wizard"))
    await settle(page)

    const steps = page.locator(".ds-wizard .ds-stepper .ds-stepper__step")
    await expect(steps.first()).toBeVisible()
    expect(await steps.count()).toBeGreaterThan(1)

    const markers = page.locator(
      ".ds-wizard .ds-stepper .ds-stepper__step .ds-stepper__marker"
    )
    expect(await markers.count()).toBe(await steps.count())

    // The active step's marker takes the accent border — the one rule that
    // would silently stop applying if the class grammar had been renamed.
    const active = page.locator(".ds-wizard .ds-stepper__step.is-active").first()
    await expect(active).toBeVisible()
    const borderColor = await active
      .locator(".ds-stepper__marker")
      .evaluate((el) => getComputedStyle(el).borderTopColor)
    const plain = await page
      .locator(".ds-wizard .ds-stepper__step:not(.is-active):not(.is-complete)")
      .first()
      .locator(".ds-stepper__marker")
      .evaluate((el) => getComputedStyle(el).borderTopColor)
    expect(borderColor).not.toBe(plain)
  })
})
