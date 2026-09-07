// Batch 6 turned thirteen class-appliers into parts and landed one component
// with no incumbent at all. Most of that is shape, and shape is covered by the
// a11y sweep and the contract check. What is pinned here is the handful of
// decisions a future edit could quietly undo — each one a place where the
// obvious change is wrong.

import { expect, test } from "@playwright/test"

import { routePath, settle } from "./harness"

const go = async (page: import("@playwright/test").Page, slug: string) => {
  await page.goto(routePath(`/docs/${slug}`))
  await settle(page)
}

/* -- kbd: the cascade this batch un-inverted ------------------------------ */
//
// The source layers kbd.css so InputGroupAddon's Tailwind utility keeps
// outranking `background: var(--input)`. There is no @layer and no Tailwind
// here, so transcribing that declaration would have inverted the cascade — the
// input-group fill would win, which is the opposite of the pre-conversion look,
// and it would have shipped inverted in beta.6 *and* beta.7. kbd.css carries
// what the utility resolved to as a plain rule instead.
test.describe("kbd inside an input group", () => {
  test("the cap is a wash of its own ink, not the field's border colour", async ({
    page,
  }) => {
    await go(page, "kbd")

    const [inGroup, standalone] = await page.evaluate(() => {
      const read = (el: Element | null) =>
        el ? getComputedStyle(el).backgroundColor : null
      return [
        read(
          document.querySelector(
            '.ds-input-group .ds-kbd, [data-slot="input-group"] .ds-kbd'
          )
        ),
        read(document.querySelector(".ds-kbd")),
      ]
    })

    expect(inGroup, "the kbd demo renders one inside an input group").not.toBe(
      null
    )
    // Distinguishable from the standalone cap, and translucent — a colour-mix
    // against transparent, which the source's flat `var(--input)` never is.
    // Chromium serialises `color-mix(in oklab, …)` as `oklab(… / a)`, so the
    // assertion is on the alpha rather than on the function name.
    expect(inGroup).not.toBe(standalone)
    const alpha = /\/\s*([\d.]+)\s*\)$/.exec(inGroup as string)?.[1]
    expect(alpha, `expected a translucent wash, got ${inGroup}`).toBeDefined()
    expect(Number(alpha)).toBeLessThan(1)
  })
})

/* -- table: two grammars in one stylesheet -------------------------------- */
//
// table.css keeps 0.11's element grammar beside the source's part grammar,
// because four files under examples/ plus docs/ read the old classes and no
// React component on either side would have re-classed them. The guards that
// keep them apart are `:not(.ds-table-head)` / `:not(.ds-table-cell)` and a
// container rule that drops the 0.11 frame.
test.describe("table's preserved element grammar", () => {
  test("the 0.11 cell padding does not leak into a composed Table", async ({
    page,
  }) => {
    await go(page, "table")
    const head = page.locator(".ds-table-head").first()
    await expect(head).toBeVisible()
    // .ds-table-head is 0.75rem inline; the 0.11 `th` rule is 12px block/inline
    // with a 10px top. If the guard were dropped, `.ds-table th` (0,1,1) would
    // outrank `.ds-table-head` (0,1,0) and the height would come from padding.
    const height = await head.evaluate((el) =>
      Math.round(el.getBoundingClientRect().height)
    )
    expect(height).toBeGreaterThanOrEqual(40)
  })

  test("the composed table is framed by its container, not by itself", async ({
    page,
  }) => {
    await go(page, "table")
    const borders = await page.evaluate(() =>
      [...document.querySelectorAll(".ds-table-container > .ds-table")].map(
        (el) => getComputedStyle(el).borderTopWidth
      )
    )
    expect(borders.length).toBeGreaterThan(0)
    expect(borders.every((w) => parseFloat(w) === 0)).toBe(true)
  })
})

/* -- toolbar: the reason the source wins ---------------------------------- */
test.describe("toolbar is one tab stop", () => {
  test("exactly one control in the strip is reachable by Tab", async ({
    page,
  }) => {
    await go(page, "toolbar")
    const stops = await page.evaluate(() => {
      const bar = document.querySelector('[data-slot="toolbar"]')
      if (!bar) return null
      return [...bar.querySelectorAll("[data-slot^='toolbar-']")]
        .filter((el) => el.getAttribute("tabindex") !== null)
        .filter((el) => el.getAttribute("tabindex") !== "-1").length
    })
    expect(stops, "the toolbar demo renders a Base UI toolbar").not.toBe(null)
    expect(stops).toBe(1)
  })
})

/* -- avatar: the behaviour the applier could not have --------------------- */
test.describe("avatar's fallback is conditional", () => {
  test("a tile with a loaded image shows no fallback", async ({ page }) => {
    await go(page, "avatar")
    const bothVisible = await page.evaluate(() =>
      [...document.querySelectorAll('[data-slot="avatar"]')].some((root) => {
        const img = root.querySelector(
          '[data-slot="avatar-image"]'
        ) as HTMLImageElement | null
        const fb = root.querySelector('[data-slot="avatar-fallback"]')
        return Boolean(img && img.complete && img.naturalWidth > 0 && fb)
      })
    )
    expect(bothVisible).toBe(false)
  })
})

/* -- progress: the state the source draws nothing for --------------------- */
test.describe("progress keeps its indeterminate rendering", () => {
  test("an indeterminate bar animates rather than sitting empty", async ({
    page,
  }) => {
    await go(page, "progress")
    const names = await page.evaluate(() =>
      [
        ...document.querySelectorAll(
          '[data-slot="progress-indicator"][data-indeterminate]'
        ),
      ].map((el) => getComputedStyle(el).animationName)
    )
    expect(names.length, "the progress demo renders value={null}").toBeGreaterThan(0)
    expect(names.every((n) => n === "ds-progress-slide")).toBe(true)
  })
})

/* -- spinner: the buildless rendering that survived ------------------------ */
test.describe("spinner has two renderings", () => {
  test("a hand-written span draws the ring; the glyph does not", async ({
    page,
  }) => {
    await go(page, "spinner")
    const { span, svg } = await page.evaluate(() => {
      const probe = document.createElement("span")
      probe.className = "ds-spinner"
      document.body.appendChild(probe)
      const span = getComputedStyle(probe).borderTopWidth
      probe.remove()
      const glyph = document.querySelector('svg[data-slot="spinner"]')
      return { span, svg: glyph ? getComputedStyle(glyph).borderTopWidth : null }
    })
    expect(parseFloat(span)).toBeGreaterThan(0)
    expect(svg, "the spinner demo renders the React binding").not.toBe(null)
    expect(parseFloat(svg as string)).toBe(0)
  })
})

/* -- pagination: what the parts bought ------------------------------------ */
test.describe("pagination pages are links", () => {
  test("a page renders an anchor with an href, and the current one says so", async ({
    page,
  }) => {
    await go(page, "pagination")
    // Scoped to one rail: the page renders four demos, and each marks its own
    // current page.
    const rail = page.locator('[data-slot="pagination"]').first()
    const links = rail.locator('a[data-slot="pagination-link"]')
    expect(await links.count()).toBeGreaterThan(1)
    await expect(links.first()).toHaveAttribute("href", /.+/)
    await expect(
      rail.locator('[data-slot="pagination-link"][aria-current="page"]')
    ).toHaveCount(1)
  })
})

/* -- breadcrumb: why the separator is an element -------------------------- */
test.describe("breadcrumb's separator is not part of a name", () => {
  test("the separator is presentational and the trail's names are clean", async ({
    page,
  }) => {
    await go(page, "breadcrumb")
    const seps = page.locator('[data-slot="breadcrumb-separator"]')
    expect(await seps.count()).toBeGreaterThan(0)
    await expect(seps.first()).toHaveAttribute("aria-hidden", "true")

    const names = await page.evaluate(() =>
      [...document.querySelectorAll('[data-slot="breadcrumb-link"]')].map(
        (el) => el.textContent ?? ""
      )
    )
    expect(names.length).toBeGreaterThan(0)
    expect(names.some((n) => n.includes("/") || n.includes("›"))).toBe(false)
  })
})

/* -- timeline: the resolved dedupe exception ------------------------------ */
test.describe("timeline row spacing is a custom property", () => {
  test("--ds-timeline-gap retunes an item, where the source used a utility", async ({
    page,
  }) => {
    await go(page, "timeline")
    const { before, after } = await page.evaluate(() => {
      const item = document.querySelector(
        '[data-slot="timeline-item"]'
      ) as HTMLElement
      const before = getComputedStyle(item).paddingBottom
      item.style.setProperty("--ds-timeline-gap", "3px")
      const after = getComputedStyle(item).paddingBottom
      return { before, after }
    })
    expect(before).not.toBe(after)
    expect(after).toBe("3px")
  })
})
