// The tooltip defect swap, pinned to what the swap actually delivers.
//
// The plan (batch-plan.md §4 batch 8) states the defect as "renders
// role="tooltip" on a sibling span with no id and no aria-describedby on the
// trigger, so a screen reader never announces it; no Escape dismissal", and
// implies the absorbed component fixes it by wiring the description.
//
// It does not, and deliberately. Base UI 1.7.0's Tooltip emits no
// `aria-describedby` and no `role="tooltip"` at all: its documented model is
// that a tooltip is a VISUAL-ONLY supplement, and the trigger must carry its
// own accessible name closely matching the tooltip's text. Recorded in
// docs/absorption/corrections.md.
//
// So what the swap really fixes is this: 0.11 emitted `role="tooltip"` on a
// span nothing referenced — announcing an association that did not exist, which
// is worse than announcing none — and had no Escape and no hoverable popup.
// These four assertions pin that, not the mechanism the plan guessed at.

import { expect, test } from "@playwright/test"

import { routePath, settle } from "./harness"

const TRIGGER = '[data-slot="tooltip-trigger"]'
const CONTENT = '[data-slot="tooltip-content"]'

test.describe("tooltip accessibility contract", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routePath("/docs/tooltip"))
    await settle(page)
  })

  test("every trigger is named without help from its tooltip", async ({
    page,
  }) => {
    // The load-bearing assertion of the whole swap. Because the popup is
    // visual-only, the trigger's own name is the ONLY thing a screen reader
    // gets — so a trigger with no name is the defect, relocated rather than
    // fixed. 0.11 could not have passed this: its trigger was a bare wrapper
    // span and the label lived in the unreferenced sibling.
    const names = await page.evaluate((sel) => {
      return [...document.querySelectorAll(sel)].map((el) => {
        const label = el.getAttribute("aria-label")
        const text = (el.textContent ?? "").trim()
        return (label ?? text).trim()
      })
    }, TRIGGER)

    expect(names.length).toBeGreaterThan(0)
    for (const name of names) {
      expect(name, "a tooltip trigger with no accessible name").not.toBe("")
    }
  })

  test("no unreferenced role=tooltip is emitted", async ({ page }) => {
    const trigger = page.locator(TRIGGER).first()
    await trigger.focus()
    await expect(page.locator(CONTENT).first()).toBeVisible()

    // 0.11's exact defect: role="tooltip" on an element with no id, and no
    // aria-describedby anywhere pointing at it. Either the role is absent, or
    // it is properly referenced — a dangling one is what this pins out.
    const dangling = await page.evaluate(() => {
      return [...document.querySelectorAll('[role="tooltip"]')].filter((el) => {
        if (!el.id) return true
        return !document.querySelector(`[aria-describedby~="${el.id}"]`)
      }).length
    })
    expect(dangling, "role=tooltip announcing an association that does not exist").toBe(0)
  })

  test("Escape dismisses the tooltip and leaves focus on the trigger", async ({
    page,
  }) => {
    const trigger = page.locator(TRIGGER).first()
    await trigger.focus()
    await expect(page.locator(CONTENT).first()).toBeVisible()

    // WCAG 1.4.13 "Dismissible". 0.11 had no key handler at all.
    await page.keyboard.press("Escape")
    await expect(page.locator(CONTENT)).toHaveCount(0)

    // And dismissal must not cost the reader their place.
    await expect(trigger).toBeFocused()
  })

  test("the popup stays open while the pointer is over it", async ({
    page,
  }) => {
    const trigger = page.locator(TRIGGER).first()
    await trigger.hover()

    const content = page.locator(CONTENT).first()
    await expect(content).toBeVisible()

    // WCAG 1.4.13 "Hoverable": content revealed on hover must be reachable by
    // the pointer, so a reader using magnification can move onto it. 0.11's
    // .ds-tooltip-host hid on the host's :hover ending, which this is not.
    const box = await content.boundingBox()
    expect(box).not.toBeNull()
    await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2)
    await page.waitForTimeout(200)
    await expect(content).toBeVisible()
  })
})
