// Tree put tabIndex 0 on every label, so Tab walked the whole tree one node at
// a time and no arrow key did anything. A tree is one tab stop with roving
// focus inside it.

import { expect, test } from "@playwright/test"

import { routePath, settle } from "./harness"

const TREE = ".ds-tree"
const LABEL = ".ds-tree__label"

test.describe("tree keyboard navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routePath("/docs/tree"))
    await settle(page)
  })

  test("the tree is a single tab stop", async ({ page }) => {
    const tabbable = await page
      .locator(`${TREE} >> css=[tabindex="0"]`)
      .count()
    expect(tabbable).toBe(1)
  })

  test("the expand chevrons are out of the tab order", async ({ page }) => {
    const stops = await page
      .locator(`${TREE} .ds-tree__toggle`)
      .evaluateAll((els) => els.map((el) => (el as HTMLElement).tabIndex))
    expect(stops.length).toBeGreaterThan(0)
    expect(stops.every((t) => t === -1)).toBe(true)
  })

  test("ArrowDown walks to the next visible row", async ({ page }) => {
    const labels = page.locator(`${TREE} ${LABEL}`)
    const first = await labels.first().textContent()
    const second = await labels.nth(1).textContent()

    await labels.first().focus()
    await page.keyboard.press("ArrowDown")

    const focused = await page.evaluate(
      () => document.activeElement?.textContent
    )
    expect(focused).toBe(second)
    expect(focused).not.toBe(first)
  })

  test("ArrowLeft collapses an open branch, ArrowRight reopens it", async ({
    page,
  }) => {
    // The demo seeds "css/" expanded.
    const branch = page.locator(`${TREE} li[role="treeitem"]`).first()
    await expect(branch).toHaveAttribute("aria-expanded", "true")

    await branch.locator(LABEL).first().focus()
    await page.keyboard.press("ArrowLeft")
    await expect(branch).toHaveAttribute("aria-expanded", "false")

    await page.keyboard.press("ArrowRight")
    await expect(branch).toHaveAttribute("aria-expanded", "true")
  })

  test("End reaches the last visible row and Home returns to the first", async ({
    page,
  }) => {
    const labels = page.locator(`${TREE} ${LABEL}`)
    const first = await labels.first().textContent()
    const last = await labels.last().textContent()

    await labels.first().focus()
    await page.keyboard.press("End")
    expect(await page.evaluate(() => document.activeElement?.textContent)).toBe(
      last
    )

    await page.keyboard.press("Home")
    expect(await page.evaluate(() => document.activeElement?.textContent)).toBe(
      first
    )
  })
})
