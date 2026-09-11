// Batch 1's own decisions, as opposed to Base UI's behaviour.
//
// Three of the six absorbed components could not land as written: `menubar`
// imported the source's held `dropdown-menu`, and `speed-dial` and
// `autocomplete` imported a `Button` and an `InputGroup` that arrive in batch 7.
// Each was re-composed onto this repo's incumbent, and batch 7 re-wires them
// back — so these assertions are what says the re-wiring is still in place and
// has not quietly reverted to a source symbol or a Tailwind literal.
//
// The last block guards the charte fix applied on the way in: the source's
// popups carried drop shadows, and this system separates by rule.

import { expect, test } from "@playwright/test"

import { routePath, settle } from "./harness"

test.describe("menubar re-wired onto the .ds-menu vocabulary", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routePath("/docs/menubar"))
    await settle(page)
  })

  test("an open menu is a .ds-menu whose rows are .ds-menu__item", async ({
    page,
  }) => {
    await page.locator(".ds-menubar-trigger").first().click()

    const popup = page.locator('[data-slot="menubar-content"]')
    await expect(popup.first()).toBeVisible()
    // The source's own dropdown-menu base never lands, so a menubar popup that
    // is not a .ds-menu is an unstyled popup.
    await expect(popup.first()).toHaveClass(/ds-menu\b/)
    expect(
      await page.locator('[data-slot="menubar-item"]').first().getAttribute("class"),
    ).toContain("ds-menu__item")
  })

  test("the bar is one tab stop and arrow keys travel between menus", async ({
    page,
  }) => {
    const triggers = page.locator(".ds-menubar-trigger")
    expect(await triggers.count()).toBeGreaterThan(1)

    await triggers.first().focus()
    await page.keyboard.press("ArrowRight")

    // Base UI's menubar root is what hands focus across; without it each menu
    // would be an isolated dropdown with a tab stop of its own.
    await expect(triggers.nth(1)).toBeFocused()
  })
})

test.describe("speed-dial re-wired onto IconButton", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routePath("/docs/speed-dial"))
    await settle(page)
  })

  test("the trigger is an icon button carrying its accessible name", async ({
    page,
  }) => {
    const trigger = page.locator('[data-slot="speed-dial"]').first()
    await expect(trigger).toHaveClass(/ds-button/)
    await expect(trigger).toHaveClass(/ds-button--icon/)
    await expect(trigger).toHaveClass(/ds-speed-dial/)
    // `label` reaches IconButton's aria-label; a dial with no visible text and
    // no name is unreachable by anything but a pointer.
    expect(await trigger.getAttribute("aria-label")).toBeTruthy()
  })

  test("the docked demos position by class, not by a Tailwind literal", async ({
    page,
  }) => {
    const docked = page.locator(".ds-speed-dial--docked")
    expect(await docked.count()).toBeGreaterThan(0)
    // The resolved dedupe exception: the source kept `absolute end-4 bottom-4`
    // literal so tailwind-merge could dedupe it. There is no tailwind-merge.
    await expect(docked.first()).toHaveCSS("position", "absolute")
  })

  test("opening swaps the glyph and closes on Escape", async ({ page }) => {
    const trigger = page.locator('[data-slot="speed-dial"]').first()
    const closeGlyph = trigger.locator(".ds-speed-dial-icon-close")

    await expect(closeGlyph).toBeHidden()
    await trigger.click()
    await expect(page.locator(".ds-speed-dial-actions").first()).toBeVisible()
    // The swap is CSS off aria-expanded, so it is the one part of the dial a
    // non-React binding still gets.
    await expect(closeGlyph).toBeVisible()

    await page.keyboard.press("Escape")
    await expect(page.locator(".ds-speed-dial-actions")).toHaveCount(0)
    await expect(trigger).toBeFocused()
  })
})

test.describe("autocomplete re-wired onto InputGroup", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routePath("/docs/autocomplete"))
    await settle(page)
  })

  test("the field is a .ds-input-group around a .ds-input", async ({ page }) => {
    const group = page.locator(".ds-input-group").first()
    await expect(group).toBeVisible()
    await expect(group.locator("input.ds-input").first()).toBeVisible()
  })

  test("the clear button is a button in the group's addon slot", async ({
    page,
  }) => {
    // The incumbent InputGroup takes its addon as the `after` prop rather than
    // as a child component, which is the shape of this re-wiring. Scoped to one
    // group: the playground's field has no `showClear` and so no addon at all,
    // so a first()/first() pair would read the input and the addon off
    // different fields and pass on an addon that renders nothing.
    const group = page
      .locator(".ds-input-group")
      .filter({ has: page.locator(".ds-input-group__addon") })
      .first()
    const input = group.locator("input.ds-input")
    const clear = group.locator('button[data-slot="autocomplete-clear"]')

    // Base UI unmounts Clear while there is nothing to clear.
    await expect(clear).toHaveCount(0)

    await input.fill("co")
    await expect(clear).toBeVisible()
    // It rides IconButton, so it wears the incumbent button's classes.
    await expect(clear).toHaveClass(/ds-button--icon/)

    await clear.click()
    expect(await input.inputValue()).toBe("")
  })

  test("typing filters the list and picking an item writes it back", async ({
    page,
  }) => {
    const input = page.locator("input.ds-input").first()
    await input.click()
    await input.fill("co")

    const item = page.locator(".ds-autocomplete-item").first()
    await expect(item).toBeVisible()
    const text = (await item.textContent())?.trim()
    await item.click()
    expect(await input.inputValue()).toBe(text)
  })
})

test.describe("charte conformance on the absorbed popups", () => {
  const SLUGS = ["context-menu", "autocomplete", "hover-card", "navigation-menu"]

  for (const slug of SLUGS) {
    test(`${slug} paints no drop shadow`, async ({ page }) => {
      await page.goto(routePath(`/docs/${slug}`))
      await settle(page)

      // The system separates by 1px rule. The source's popups arrived with a
      // 10%-ink ring plus two shadow layers; they land as bordered surfaces.
      // Scoped to this component's own classes so an incumbent elsewhere on the
      // page cannot fail it, or hide a regression by passing.
      const shadowed = await page.evaluate((prefix) => {
        const els = Array.from(
          document.querySelectorAll(`[class*="ds-${prefix}"]`),
        )
        return els
          .map((el) => getComputedStyle(el).boxShadow)
          .filter((s) => s !== "none" && !s.includes("inset"))
      }, slug)

      expect(shadowed).toEqual([])
    })
  }
})
