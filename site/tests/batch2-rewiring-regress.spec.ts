// Batch 2's own decisions, as opposed to Base UI's behaviour.
//
// Four of the fifteen absorbed components could not land as written.
// `theme-switcher` imported the source's held `dropdown-menu` and
// `toggle-group`; `snippet` imported the held `code-block`; `attachment`
// imported a `Button` that arrives in batch 7. Each was re-composed onto this
// repo's incumbent, so the first four blocks are what says the re-wiring is
// still in place and has not quietly reverted to a source symbol.
//
// The rest guards work paid on the way in that nothing else would catch: the
// eight dedupe exceptions resolved into real declarations plus a modifier
// class, the two Tailwind plugin classes re-implemented as real CSS, and the
// charte's no-drop-shadow rule on the surfaces this batch lands.

import { expect, test } from "@playwright/test"

import { routePath, settle } from "./harness"

test.describe("theme-switcher re-wired off toggle-group and dropdown-menu", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routePath("/docs/theme-switcher"))
    await settle(page)
  })

  test("the segmented variant is a .ds-segmented row inside a labelled group", async ({
    page,
  }) => {
    const group = page.locator('[data-slot="theme-switcher"][data-variant="segmented"]').first()
    await expect(group).toBeVisible()
    // The source's own toggle-group never lands. A switcher that is not a
    // .ds-segmented row is an unstyled row.
    await expect(group).toHaveAttribute("role", "group")
    await expect(group).toHaveAttribute("aria-label", "Theme")
    await expect(group.locator(".ds-segmented").first()).toBeVisible()
    expect(await group.locator(".ds-segmented__item").count()).toBe(3)
  })

  test("each segmented cell carries a visible name, not an icon alone", async ({
    page,
  }) => {
    // Segmented takes a label node rather than a per-item aria-label, so the
    // accessible name has to come from visible text. Icon-only cells here would
    // be three unnamed buttons.
    const cells = page.locator(
      '[data-variant="segmented"] .ds-segmented__item',
    )
    for (const name of ["Light", "Dark", "System"]) {
      await expect(cells.filter({ hasText: name }).first()).toBeVisible()
    }
  })

  test("clicking a cell selects it and re-clicking it is a no-op", async ({
    page,
  }) => {
    const cells = page.locator(
      '[data-variant="segmented"] .ds-segmented__item',
    )
    const dark = cells.filter({ hasText: "Dark" }).first()
    await dark.click()
    await expect(dark).toHaveAttribute("aria-pressed", "true")
    // A theme is never "none": Segmented swallows a click on the pressed cell.
    await dark.click()
    await expect(dark).toHaveAttribute("aria-pressed", "true")
  })

  test("the dropdown variant opens a .ds-menu of radio rows", async ({
    page,
  }) => {
    await page
      .locator('[data-slot="theme-switcher"][data-variant="dropdown"]')
      .first()
      .click()

    const popup = page.locator(".ds-menu").first()
    await expect(popup).toBeVisible()
    const rows = popup.locator('[role="menuitemradio"]')
    expect(await rows.count()).toBe(3)
    // Base UI's Menu radio rows wearing this repo's row class. The source's
    // dropdown-menu base is held, so a row that is not a .ds-menu__item is
    // unstyled.
    await expect(rows.first()).toHaveClass(/ds-menu__item\b/)
  })
})

test.describe("snippet re-wired onto CodeBlock's extracted copy button", () => {
  test("the copy affordance is .ds-code's button, named and functional", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"])
    await page.goto(routePath("/docs/snippet"))
    await settle(page)

    const button = page.locator(".ds-snippet-copy-button").first()
    // Extracted from CodeBlock rather than reimplemented, so it is still a
    // .ds-button underneath — that is what says the re-wiring holds.
    await expect(button).toHaveClass(/ds-button\b/)
    await expect(button).toHaveAttribute("aria-label", "Copy")

    await button.click()
    // The idle name flips to "Copied" from the button's own state, which a
    // caller-supplied aria-label would have pinned shut.
    await expect(button).toHaveAttribute("aria-label", "Copied")
  })
})

test.describe("attachment re-wired onto IconButton", () => {
  test("every attachment action is a named icon button", async ({ page }) => {
    await page.goto(routePath("/docs/attachment"))
    await settle(page)

    const actions = page.locator('[data-slot="attachment-action"]')
    expect(await actions.count()).toBeGreaterThan(0)

    for (const action of await actions.all()) {
      // IconButton requires `label`, which the source's ghost icon button did
      // not — an unnamed icon-only control is the regression this catches.
      await expect(action).toHaveClass(/ds-button--icon\b/)
      const label = await action.getAttribute("aria-label")
      expect(label?.trim()).toBeTruthy()
    }
  })
})

test.describe("item lands with its Separator, not a forward import", () => {
  test("an item separator is a real .ds-separator with a resolved rule", async ({
    page,
  }) => {
    await page.goto(routePath("/docs/item"))
    await settle(page)

    const separator = page.locator('[data-slot="item-separator"]').first()
    await expect(separator).toBeVisible()
    await expect(separator).toHaveClass(/ds-separator\b/)

    // The source kept bg-border and the axis sizing as Tailwind literals so
    // tailwind-merge could dedupe them. Resolved into separator.css, so the
    // rule has to have a colour and a height of its own here.
    const painted = await separator.evaluate((el) => {
      const style = getComputedStyle(el)
      return { bg: style.backgroundColor, height: style.height }
    })
    expect(painted.bg).not.toBe("rgba(0, 0, 0, 0)")
    expect(parseFloat(painted.height)).toBeGreaterThan(0)
  })
})

test.describe("the resolved dedupe exceptions are real declarations", () => {
  // Each of these was a Tailwind literal kept in place upstream so
  // tailwind-merge could dedupe it against a consumer override. There is no
  // tailwind-merge here, so each has to be a real declaration — a zero value
  // means the literal was dropped rather than resolved.
  const GAPS = [
    { slug: "bubble", selector: ".ds-bubble-group", prop: "rowGap" },
    { slug: "toc", selector: ".ds-toc-list", prop: "rowGap" },
    {
      slug: "message-scroller",
      selector: ".ds-message-scroller-content",
      prop: "rowGap",
    },
  ]

  for (const { slug, selector, prop } of GAPS) {
    test(`${selector} owns its own gap`, async ({ page }) => {
      await page.goto(routePath(`/docs/${slug}`))
      await settle(page)

      const value = await page
        .locator(selector)
        .first()
        .evaluate(
          (el, key) =>
            getComputedStyle(el)[key as "rowGap"] as string,
          prop,
        )
      expect(parseFloat(value)).toBeGreaterThan(0)
    })
  }

  test(".ds-toc is sticky by default", async ({ page }) => {
    await page.goto(routePath("/docs/toc"))
    await settle(page)

    // `sticky top-8` was the literal; the default is baked and
    // `.ds-toc--static` is the opt-out, so a Toc without that modifier has to
    // still be sticky.
    const plain = page.locator(".ds-toc:not(.ds-toc--static)").first()
    await expect(plain).toBeVisible()
    const position = await plain.evaluate(
      (el) => getComputedStyle(el).position,
    )
    expect(position).toBe("sticky")
  })

  test(".ds-resizable-panel-group fills its box by default", async ({
    page,
  }) => {
    await page.goto(routePath("/docs/resizable"))
    await settle(page)

    // `h-full w-full` were the literals every demo overrode. Baked as the
    // group's own defaults, so a group given a height fills it.
    const group = page.locator(".ds-resizable-panel-group").first()
    await expect(group).toBeVisible()
    const box = await group.boundingBox()
    expect(box?.height ?? 0).toBeGreaterThan(0)
  })
})

test.describe("the Tailwind-plugin classes are re-implemented, not dropped", () => {
  const MASKED = [
    {
      slug: "message-scroller",
      selector: ".ds-message-scroller-viewport",
      was: "scroll-fade-b",
    },
    {
      slug: "attachment",
      selector: ".ds-attachment-group",
      was: "scroll-fade-x",
    },
  ]

  for (const { slug, selector, was } of MASKED) {
    test(`${selector} fades where ${was} used to`, async ({ page }) => {
      await page.goto(routePath(`/docs/${slug}`))
      await settle(page)

      // Both came from shadcn's Tailwind plugin and were shipping as class
      // names with nothing behind them. A mask of "none" means the fade is
      // silently gone again.
      const mask = await page
        .locator(selector)
        .first()
        .evaluate((el) => {
          const style = getComputedStyle(el)
          return style.maskImage || style.webkitMaskImage
        })
      expect(mask).toContain("gradient")
    })
  }
})

test.describe("charte conformance on the surfaces batch 2 lands", () => {
  const SLUGS = ["attachment", "bubble", "item", "snippet", "message"]

  for (const slug of SLUGS) {
    test(`${slug} paints no drop shadow`, async ({ page }) => {
      await page.goto(routePath(`/docs/${slug}`))
      await settle(page)

      // The system separates by 1px rule. Scoped to this component's own
      // classes so an incumbent elsewhere on the page cannot fail it, or hide
      // a regression by passing.
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
