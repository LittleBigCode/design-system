// DataGrid rendered a real <table> and stopped there: no grid roles, so the
// cells were not individually reachable, and no roving focus, so a keyboard
// reader could not steer a wide table a cell at a time.
//
// The risk in adding it is the inline edit handler: the editor's input sits
// inside a cell, and a naive cell-level keydown would eat its Enter (commit)
// and Escape (cancel) and fight its caret with the arrows. The last test here
// is the one that guards that collision.

import { expect, test } from "@playwright/test"

import { routePath, settle } from "./harness"

const TABLE = ".ds-datagrid__table"

test.describe("data grid keyboard model", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routePath("/docs/data-table"))
    await settle(page)
  })

  test("the table exposes grid semantics", async ({ page }) => {
    const table = page.locator(TABLE).first()
    await expect(table).toHaveAttribute("role", "grid")
    expect(await table.locator('[role="row"]').count()).toBeGreaterThan(1)
    expect(await table.locator('[role="gridcell"]').count()).toBeGreaterThan(0)
  })

  test("the whole grid is a single tab stop", async ({ page }) => {
    const stops = await page
      .locator(TABLE)
      .first()
      .evaluate(
        (table) =>
          Array.from((table as HTMLTableElement).rows).flatMap((r) => Array.from(r.cells))
            .filter((c) => c.tabIndex === 0).length
      )
    expect(stops).toBe(1)
  })

  test("arrows move a cell at a time, in both axes", async ({ page }) => {
    const table = page.locator(TABLE).first()
    const start = await table.evaluate((t) => {
      const cell = Array.from((t as HTMLTableElement).rows)
        .flatMap((r) => Array.from(r.cells))
        .find((c) => c.tabIndex === 0)!
      cell.focus()
      return { r: (cell.parentElement as HTMLTableRowElement).rowIndex, c: cell.cellIndex }
    })

    await page.keyboard.press("ArrowRight")
    expect(await activeCoords(page)).toEqual({ r: start.r, c: start.c + 1 })

    await page.keyboard.press("ArrowDown")
    expect(await activeCoords(page)).toEqual({ r: start.r + 1, c: start.c + 1 })

    await page.keyboard.press("ArrowLeft")
    expect(await activeCoords(page)).toEqual({ r: start.r + 1, c: start.c })
  })

  test("Home and End reach the ends of the row", async ({ page }) => {
    const table = page.locator(TABLE).first()
    await table.evaluate((t) => {
      const cell = Array.from((t as HTMLTableElement).rows)
        .flatMap((r) => Array.from(r.cells))
        .find((c) => c.tabIndex === 0)!
      cell.focus()
    })

    await page.keyboard.press("End")
    const end = await activeCoords(page)
    expect(end.c).toBeGreaterThan(0)

    await page.keyboard.press("Home")
    expect((await activeCoords(page)).c).toBe(0)
  })

  test("the inline editor keeps its own keys", async ({ page }) => {
    const editable = page.locator(`${TABLE} .ds-datagrid__td--editable`).first()
    if ((await editable.count()) === 0) test.skip()

    await editable.dblclick()
    const input = page.locator(".ds-datagrid__edit")
    await expect(input).toBeFocused()

    // Arrows must move the caret inside the input, not the cell focus.
    await input.fill("keyboard test")
    await page.keyboard.press("ArrowLeft")
    await expect(input).toBeFocused()

    // Escape must reach the editor's own cancel handler.
    await page.keyboard.press("Escape")
    await expect(input).toHaveCount(0)
  })
})

async function activeCoords(page: any) {
  return page.evaluate(() => {
    const el = document.activeElement as HTMLTableCellElement | null
    if (!el || !el.parentElement) return null
    return {
      r: (el.parentElement as HTMLTableRowElement).rowIndex,
      c: el.cellIndex,
    }
  })
}
