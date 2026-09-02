import { test, expect, type Page } from "@playwright/test"
import { routePath } from "./harness"

const BOARD = '[data-slot="kanban"]'
const COL = '[data-slot="kanban-column"]'
const GRIP = '[data-slot="kanban-card-grip"]'
const TITLE = '[data-slot="kanban-card-title"]'

async function state(page: Page, boardIndex: number) {
  return page.evaluate(
    ({ boardIndex, BOARD, COL, TITLE }) => {
      const board = document.querySelectorAll(BOARD)[boardIndex]
      return [...board.querySelectorAll(COL)].map((c) => ({
        title: c.querySelector('[data-slot="kanban-column-title"]')!
          .textContent,
        cards: [...c.querySelectorAll(TITLE)].map((t) => t.textContent),
      }))
    },
    { boardIndex, BOARD, COL, TITLE }
  )
}

async function keyboardMove(
  page: Page,
  boardIndex: number,
  colIndex: number,
  cardIndex: number,
  key: string
) {
  await page.evaluate(
    ({ boardIndex, colIndex, cardIndex, BOARD, COL, GRIP }) => {
      const board = document.querySelectorAll(BOARD)[boardIndex]
      const col = board.querySelectorAll(COL)[colIndex]
      const grip = col.querySelectorAll(GRIP)[cardIndex] as HTMLElement
      grip.scrollIntoView({ block: "center" })
      grip.focus()
    },
    { boardIndex, colIndex, cardIndex, BOARD, COL, GRIP }
  )
  // dnd-kit measures its droppables after the activation tick; an arrow key
  // fired in the same millisecond is swallowed before the drag exists.
  await page.keyboard.press("Space")
  await page.waitForTimeout(120)
  await page.keyboard.press(key)
  await page.waitForTimeout(120)
  await page.keyboard.press("Space")
  await page.waitForTimeout(250)
}

test.beforeEach(async ({ page }) => {
  await page.goto(routePath("/docs/kanban"))
  await page.waitForSelector(BOARD)
})

test("keyboard moves a card across columns", async ({ page }) => {
  const before = await state(page, 1)
  expect(before[1].cards).toHaveLength(1)
  await keyboardMove(page, 1, 1, 0, "ArrowRight")
  const after = await state(page, 1)
  expect(after[1].cards).toHaveLength(0)
  expect(after[2].cards).toContain(before[1].cards[0])
})

test("keyboard drops a card into an empty column", async ({ page }) => {
  const before = await state(page, 1)
  expect(before[2].cards).toHaveLength(0) // Shipped starts empty
  await keyboardMove(page, 1, 1, 0, "ArrowRight")
  const after = await state(page, 1)
  expect(after[2].cards).toHaveLength(1)
})

test("within-column downward reorder actually moves the card", async ({
  page,
}) => {
  // seed a second card into column 1 of the basic board
  await keyboardMove(page, 1, 0, 0, "ArrowRight")
  const seeded = await state(page, 1)
  expect(seeded[1].cards.length).toBeGreaterThan(1)

  const first = seeded[1].cards[0]
  await keyboardMove(page, 1, 1, 0, "ArrowDown")
  const after = await state(page, 1)
  expect(after[1].cards[0]).not.toBe(first)
  expect(after[1].cards).toContain(first)
})

test("onMove fires on a column change but not on a reorder", async ({
  page,
}) => {
  const readout = () =>
    page.evaluate(() => {
      const boards = document.querySelectorAll('[data-slot="kanban"]')
      const last = boards[boards.length - 1]
      return last.parentElement!.querySelector("p")!.textContent
    })

  expect(await readout()).toBe("No moves yet.")
  await keyboardMove(page, 3, 0, 0, "ArrowRight")
  const afterCross = await readout()
  expect(afterCross).toContain("→")

  // now a within-column reorder must leave the readout untouched
  await keyboardMove(page, 3, 1, 0, "ArrowDown")
  expect(await readout()).toBe(afterCross)
})

test("pointer drag moves a card across columns", async ({ page }) => {
  const before = await state(page, 1)
  const source = before[1].cards[0]

  const box = await page.evaluate(
    ({ BOARD, COL, GRIP }) => {
      const board = document.querySelectorAll(BOARD)[1]
      const cols = board.querySelectorAll(COL)
      const grip = cols[1].querySelector(GRIP) as HTMLElement
      const target = cols[2].querySelector(
        '[data-slot="kanban-column-list"]'
      ) as HTMLElement
      grip.scrollIntoView({ block: "center" })
      const g = grip.getBoundingClientRect()
      const t = target.getBoundingClientRect()
      return {
        from: { x: g.left + g.width / 2, y: g.top + g.height / 2 },
        to: { x: t.left + t.width / 2, y: t.top + 20 },
      }
    },
    { BOARD, COL, GRIP }
  )

  await page.mouse.move(box.from.x, box.from.y)
  await page.mouse.down()
  // several steps so dnd-kit sees movement and fires onDragOver
  for (let i = 1; i <= 8; i++) {
    await page.mouse.move(
      box.from.x + ((box.to.x - box.from.x) * i) / 8,
      box.from.y + ((box.to.y - box.from.y) * i) / 8
    )
    await page.waitForTimeout(20)
  }
  // live reflow must be visible BEFORE the drop
  const during = await state(page, 1)
  expect(during[2].cards).toContain(source)

  await page.mouse.up()
  await page.waitForTimeout(250)
  const after = await state(page, 1)
  expect(after[2].cards).toContain(source)
  expect(after[1].cards).not.toContain(source)
})
