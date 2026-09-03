// The drawer defect swap — one spec for both halves, because it is one swap.
//
// 0.11 had a single `Drawer` symbol; the absorption splits it into `Drawer`
// (swipeable, snap points) and `Sheet` (edge-docked, what `placement` meant).
// The merge had to land whole, so it is pinned whole: every assertion below
// runs against both routes.
//
// The measured defect (batch-plan.md §4 batch 8): Drawer.js had Escape and
// role=dialog/aria-modal, but NO FOCUS TRAP and NO PORTAL — and nothing in 0.11
// implemented a focus trap to copy, Modal included. So Tab walked straight out
// of an open drawer into the page behind it, and the panel was clipped by any
// ancestor that established a containing block.
//
// Three things are pinned per route: the portal (the panel is a child of
// <body>, not of the trigger's subtree), the trap (Tab cycles inside), and
// focus restoration on close.

import { expect, test, type Page } from "@playwright/test"

import { routePath, settle } from "./harness"

type Surface = {
  slug: string
  trigger: string
  panel: string
  /** The demo whose trigger is opened — the first one on the page. */
  label: string
}

const SURFACES: Surface[] = [
  {
    slug: "drawer",
    trigger: '[data-slot="drawer-trigger"]',
    panel: '[data-slot="drawer-popup"]',
    label: "Drawer",
  },
  {
    slug: "sheet",
    trigger: '[data-slot="sheet-trigger"]',
    panel: '[data-slot="sheet-content"]',
    label: "Sheet",
  },
]

async function openFirst(page: Page, surface: Surface) {
  const trigger = page.locator(surface.trigger).first()
  await trigger.click()
  await expect(page.locator(surface.panel).first()).toBeVisible()
  return trigger
}

for (const surface of SURFACES) {
  test.describe(`${surface.label} — portal and focus trap`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(routePath(`/docs/${surface.slug}`))
      await settle(page)
    })

    test("the panel is portalled out to <body>", async ({ page }) => {
      await openFirst(page, surface)

      // 0.11 rendered in place, so an ancestor with overflow/transform clipped
      // the panel. The portal is what makes `position: fixed` mean the viewport.
      const escaped = await page.evaluate((sel) => {
        const panel = document.querySelector(sel)
        if (!panel) return null
        // Walk up: nothing between the panel and <body> may be the docs page's
        // own article/main content — the panel must hang off the document.
        let node: HTMLElement | null = panel.parentElement
        let depth = 0
        while (node && node !== document.body) {
          if (node.closest("main, article, [data-slot='docs-content']")) {
            return { inContent: true, depth }
          }
          node = node.parentElement
          depth += 1
        }
        return { inContent: false, depth }
      }, surface.panel)

      expect(escaped).not.toBeNull()
      expect(
        escaped!.inContent,
        "the panel is still inside the page content — it was not portalled"
      ).toBe(false)
    })

    test("Tab is trapped inside the open panel", async ({ page }) => {
      await openFirst(page, surface)

      // Tab around more times than the panel has stops, so an escape shows up
      // as focus landing outside rather than as a lucky wrap.
      //
      // The beat after each press is load-bearing. A focus trap is built from
      // guard sentinels — a tabindex=0 span sitting just outside the panel that
      // catches the Tab and wraps focus back to the other end. Reading
      // activeElement synchronously catches the guard itself, before its
      // handler runs, and reports a working trap as a broken one.
      const seen: string[] = []
      const inside: boolean[] = []
      for (let i = 0; i < 8; i += 1) {
        await page.keyboard.press("Tab")
        await page.waitForTimeout(120)
        const at = await page.evaluate((sel) => {
          const panel = document.querySelector(sel)
          const active = document.activeElement
          return {
            inside: !!panel && !!active && panel.contains(active),
            id:
              (active?.tagName ?? "none") +
              "/" +
              (active?.textContent ?? "").trim().slice(0, 24),
          }
        }, surface.panel)
        inside.push(at.inside)
        seen.push(at.id)
      }

      expect(
        inside.every(Boolean),
        `focus left the panel on tab #${inside.indexOf(false) + 1} — no focus trap`
      ).toBe(true)

      // And it must CYCLE, not dead-end on the last stop: a panel with more
      // than one focusable has to come back round to where it started.
      const unique = new Set(seen)
      if (unique.size > 1) {
        expect(
          seen.slice(unique.size).some((stop) => stop === seen[0]),
          "focus never returned to the first stop — the trap does not wrap"
        ).toBe(true)
      }
    })

    test("Escape closes and focus returns to the trigger", async ({ page }) => {
      const trigger = await openFirst(page, surface)

      await page.keyboard.press("Escape")
      await expect(page.locator(surface.panel)).toHaveCount(0)

      // 0.11 closed on Escape but never restored focus, so the reader was
      // dropped back at the top of the document.
      await expect(trigger).toBeFocused()
    })
  })
}
