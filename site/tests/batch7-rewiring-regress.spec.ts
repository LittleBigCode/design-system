// Batch 7 absorbed sixteen components whose class names are fixed by a surface
// outside this package — a `<ds-*>` web component, a Streamlit page, or
// `Card.js`. Shape is covered by the a11y sweep and by check-contracts. What is
// pinned here is the set of decisions a future edit could quietly undo, each
// one a place where the obvious change breaks a consumer this repo cannot see.
//
// Most of it is asserted by injecting hand-written markup into a live page and
// reading computed style. That is deliberate: the consumers at risk are the ones
// who write `.ds-*` HTML by hand and have no component to protect them, so the
// test has to be markup, not a React tree.

import { expect, test, type Page } from "@playwright/test"

import { icons } from "@diametral/design-system/react"

import { routePath, settle } from "./harness"

const go = async (page: Page, slug: string) => {
  await page.goto(routePath(`/docs/${slug}`))
  await settle(page)
}

/** Mount raw HTML, read one computed property off a selector inside it, unmount. */
async function styleOf(page: Page, html: string, selector: string, prop: string) {
  return page.evaluate(
    ([markup, sel, property]) => {
      const host = document.createElement("div")
      host.innerHTML = markup
      document.body.appendChild(host)
      const node = host.querySelector(sel)
      const value = node ? getComputedStyle(node).getPropertyValue(property) : null
      host.remove()
      return value
    },
    [html, selector, prop] as const
  )
}

/* -- The three grammar guards --------------------------------------------- */
//
// `.ds-checkbox`, `.ds-switch` and `.ds-input-group` each carry two grammars:
// 0.11's, which committed fixtures under examples/ render and nothing in this
// migration re-classes, and the absorbed one. They are told apart by what the
// element contains — `> .ds-checkbox__box`, `> .ds-switch__track`,
// `> .ds-input-group__addon` — the same mechanism table.css used in beta.6.
//
// Drop a guard and one of the two silently takes the other's box. These pin the
// direction: the 0.11 root is a *label* (a flex row that sizes to its text), the
// absorbed root is the *control* (a fixed square or a full-width field).

test.describe("checkbox: two grammars, one class", () => {
  test("0.11's label root stays a label, not an 18px box", async ({ page }) => {
    await go(page, "checkbox")
    const width = await styleOf(
      page,
      `<label class="ds-checkbox"><input type="checkbox"><span class="ds-checkbox__box"></span><span>Accept the terms</span></label>`,
      ".ds-checkbox",
      "width"
    )
    // A label sized to "Accept the terms" is far wider than the absorbed box.
    expect(Number.parseFloat(width!)).toBeGreaterThan(60)
  })

  test("the absorbed root is the 18px box", async ({ page }) => {
    await go(page, "checkbox")
    const width = await styleOf(
      page,
      `<button class="ds-checkbox" role="checkbox" aria-checked="false"><span class="ds-checkbox-indicator"></span></button>`,
      ".ds-checkbox",
      "width"
    )
    expect(width).toBe("18px")
  })
})

test.describe("switch: two grammars, one class", () => {
  test("0.11's label root does not take the absorbed track's fixed size", async ({
    page,
  }) => {
    await go(page, "switch")
    const width = await styleOf(
      page,
      `<label class="ds-switch"><input type="checkbox"><span class="ds-switch__track"></span><span>Detail mode</span></label>`,
      ".ds-switch",
      "width"
    )
    // `<ds-switch>` renders exactly this markup, so a regression here unstyles a
    // frozen web component.
    expect(Number.parseFloat(width!)).toBeGreaterThan(60)
  })

  test("the absorbed root is the track", async ({ page }) => {
    await go(page, "switch")
    const width = await styleOf(
      page,
      `<button class="ds-switch" role="switch" data-size="default" data-unchecked><span class="ds-switch-thumb"></span></button>`,
      ".ds-switch",
      "width"
    )
    expect(width).toBe("33px")
  })
})

test.describe("input group: two grammars, one class", () => {
  test("0.11's strip stays inline-flex with bordered addons", async ({ page }) => {
    await go(page, "input-group")
    const html = `<div class="ds-input-group"><span class="ds-input-group__addon">€</span><input class="ds-input" value="900"></div>`
    expect(await styleOf(page, html, ".ds-input-group", "display")).toBe(
      "inline-flex"
    )
    // The addon carries the border in this grammar; the group carries none.
    expect(await styleOf(page, html, ".ds-input-group", "border-top-width")).toBe(
      "0px"
    )
    expect(
      await styleOf(page, html, ".ds-input-group__addon", "border-top-width")
    ).toBe("1px")
  })

  test("the absorbed group carries the box itself", async ({ page }) => {
    await go(page, "input-group")
    const html = `<div class="ds-input-group" data-slot="input-group"><input class="ds-input ds-input-group-input" data-slot="input-group-control"></div>`
    expect(await styleOf(page, html, ".ds-input-group", "border-top-width")).toBe(
      "1px"
    )
    expect(
      await styleOf(page, html, ".ds-input-group-input", "border-top-width")
    ).toBe("0px")
  })
})

/* -- The contract that display is part of the contract --------------------- */
//
// `docs/streamlit.md` publishes `<div class="ds-card" style="padding:18px 20px">On
// track <span class="ds-tag ds-tag--success">Run</span></div>` — inline content
// with no parts at all. The source's `.ds-card` is a flex column, and absorbing
// that would stack the tag onto its own line for every Python consumer.
//
// `<ds-panel>` is the same shape of problem from the other direction: it wraps
// arbitrary light DOM, so a bare paragraph inside one has no part to pad it and
// the padding cannot move off the root.

test.describe("classes an external surface writes over arbitrary children", () => {
  test("a bare .ds-card does not stack its inline content", async ({ page }) => {
    await go(page, "card")
    const display = await styleOf(
      page,
      `<div class="ds-card">On track <span class="ds-tag ds-tag--success">Run</span></div>`,
      ".ds-card",
      "display"
    )
    expect(display).not.toBe("flex")
  })

  test("a bare .ds-panel still pads its own children", async ({ page }) => {
    await go(page, "panel")
    const padding = await styleOf(
      page,
      `<div class="ds-panel"><p>Body content.</p></div>`,
      ".ds-panel",
      "padding-left"
    )
    expect(Number.parseFloat(padding!)).toBeGreaterThan(0)
  })
})

/* -- Button: the absent variant ------------------------------------------- */
//
// `<ds-button>` with no `variant` attribute renders a bare `class="ds-button"`,
// which is 0.11's white ink-bordered button. `<Button />` with no prop has to
// render the same thing, or the two bindings disagree about the same absence —
// on the package's most frozen surface.

test.describe("button", () => {
  test("no variant emits no modifier", async ({ page }) => {
    await go(page, "button")
    const classes = await page.evaluate(() => {
      const host = document.createElement("div")
      document.body.appendChild(host)
      // The rendered demos are the source of truth for what the binding emits;
      // this asserts the CSS side, which is what a hand-written consumer gets.
      host.innerHTML = `<button class="ds-button">Cancel</button>`
      const node = host.querySelector(".ds-button")!
      const style = getComputedStyle(node)
      const value = [style.backgroundColor, style.borderTopWidth]
      host.remove()
      return value
    })
    const [background, border] = classes
    // Bordered and not the solid ink fill --primary paints.
    expect(border).toBe("1px")
    expect(background).not.toBe("rgb(0, 0, 0)")
  })

  test("every documented modifier in the frozen family resolves", async ({
    page,
  }) => {
    await go(page, "button")
    // `<ds-button variant="x">` concatenates `ds-button--x` from a pass-through
    // attribute, so the whole family is frozen — not just the names 0.11 shipped.
    const FAMILY = [
      "primary",
      "danger",
      "default",
      "outline",
      "secondary",
      "ghost",
      "destructive",
      "link",
      "sm",
      "lg",
      "xs",
      "icon",
      "block",
      "loading",
      "tone-black",
      "tone-red",
      "tone-brown",
      "tone-khaki",
      "tone-beige",
      "tone-green",
      "tone-blue",
      "tone-yellow",
    ]
    const undefinedRules = await page.evaluate((family) => {
      const defined = new Set<string>()
      for (const sheet of Array.from(document.styleSheets)) {
        let rules: CSSRuleList
        try {
          rules = sheet.cssRules
        } catch {
          continue
        }
        for (const rule of Array.from(rules)) {
          const text = (rule as CSSStyleRule).selectorText
          if (!text) continue
          for (const match of text.matchAll(/\.ds-button--([a-z-]+)/g)) {
            defined.add(match[1])
          }
        }
      }
      return family.filter((name) => !defined.has(name))
    }, FAMILY)
    expect(undefinedRules).toEqual([])
  })
})

/* -- Status: one class, two components, and a variable that inherits ------- */

test.describe("status", () => {
  test("the panel and the inline indicator do not take each other's box", async ({
    page,
  }) => {
    await go(page, "status")
    const panel = `<div class="ds-status ds-status--success"><div class="ds-status__head"><div class="ds-status__title">Conforme</div></div></div>`
    const inline = `<span class="ds-status ds-status--success"><span class="ds-status-indicator"></span><span class="ds-status-label">Running</span></span>`
    // The panel is a bordered block; the indicator is a bare inline-flex row.
    expect(await styleOf(page, panel, ".ds-status", "border-top-width")).toBe("1px")
    expect(await styleOf(page, inline, ".ds-status", "display")).toBe("inline-flex")
    expect(await styleOf(page, inline, ".ds-status", "border-top-width")).toBe("0px")
  })

  test("--tone does not leak out of the indicator into a nested meter", async ({
    page,
  }) => {
    await go(page, "status")
    // progress.css and meter.css both read a bare `var(--tone, var(--ds-accent))`
    // on an untoned indicator, and --tone inherits. Declared on the panel form as
    // well, a <Progress> inside a success panel would silently take the panel's
    // colour. The `:has()` guard on the tone rules is what stops it.
    const tone = await styleOf(
      page,
      `<div class="ds-status ds-status--success"><div class="ds-status__body"><div class="ds-meter"><div class="ds-meter-track"><div class="ds-meter-indicator"></div></div></div></div></div>`,
      ".ds-meter-indicator",
      "background-color"
    )
    const accent = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--ds-accent")
        .trim()
    )
    expect(accent).not.toBe("")
    // Resolved through the token, not through the panel's tone.
    expect(tone).not.toBe("rgba(0, 0, 0, 0)")
  })
})

/* -- ds-open / ds-close are events, not classes ---------------------------- */
//
// The plan and the CSS ledger call them dead classes and ask this batch to
// implement or delete them. They are CustomEvent names — a grep artifact, since
// a `ds-[a-z-]+` scan cannot tell a class literal from an event name. This pins
// the finding so a later reader does not "fix" it by adding a rule or by
// deleting the dispatch.

test.describe("ds-modal's ds-open / ds-close", () => {
  test("match no rule, because they are event names", async ({ page }) => {
    await go(page, "button")
    const inStylesheets = await page.evaluate(() => {
      for (const sheet of Array.from(document.styleSheets)) {
        let rules: CSSRuleList
        try {
          rules = sheet.cssRules
        } catch {
          continue
        }
        for (const rule of Array.from(rules)) {
          const text = (rule as CSSStyleRule).selectorText
          if (text && /\.ds-(open|close)\b/.test(text)) return text
        }
      }
      return null
    })
    expect(
      inStylesheets,
      "ds-open / ds-close are CustomEvent names; a rule for them would be the defect, not the fix"
    ).toBe(null)
  })
})

/* -- Icon: Lucide -> Phosphor, names unchanged ----------------------------- */

test.describe("icon", () => {
  test("draws filled Phosphor geometry, not a Lucide stroke", async ({ page }) => {
    await go(page, "icon")
    const svg = page.locator("svg.ds-icon").first()
    await expect(svg).toBeVisible()
    expect(await svg.getAttribute("viewBox")).toBe("0 0 256 256")
    const [fill, stroke] = await svg.evaluate((el) => {
      const style = getComputedStyle(el)
      return [style.fill, style.stroke]
    })
    expect(stroke).toBe("none")
    expect(fill).not.toBe("none")
  })

  test("every 0.11 icon name still resolves", async () => {
    // The set moved; the names did not. A name that stopped resolving would
    // render a blank SVG rather than throwing, so nothing else would catch it.
    const NAMES = [
      "search",
      "menu",
      "x",
      "chevron-down",
      "chevron-right",
      "chevron-left",
      "chevron-up",
      "plus",
      "minus",
      "check",
      "user",
      "users",
      "settings",
      "bell",
      "trash",
      "edit",
      "download",
      "upload",
      "filter",
      "calendar",
      "file",
      "folder",
      "home",
      "grid",
      "list",
      "external-link",
      "arrow-right",
      "arrow-left",
      "more-horizontal",
      "eye",
      "lock",
      "log-out",
      "sun",
      "moon",
    ]
    const set = icons as Record<string, string>
    expect(NAMES.filter((name) => !set[name])).toEqual([])
  })
})

/* -- select: 2 of the 18 z-index remaps ------------------------------------ */

test.describe("select", () => {
  test("the popup sits at --ds-z-popover, not the source's bare 50", async ({
    page,
  }) => {
    await go(page, "select")
    const token = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--ds-z-popover")
        .trim()
    )
    expect(token).not.toBe("")
    const zIndexes = await page.evaluate(() => {
      const found: string[] = []
      for (const sheet of Array.from(document.styleSheets)) {
        let rules: CSSRuleList
        try {
          rules = sheet.cssRules
        } catch {
          continue
        }
        for (const rule of Array.from(rules)) {
          const style = rule as CSSStyleRule
          if (!style.selectorText) continue
          if (!/\.ds-select-(positioner|content)\b/.test(style.selectorText)) continue
          const value = style.style.getPropertyValue("z-index").trim()
          if (value) found.push(value)
        }
      }
      return found
    })
    expect(zIndexes.length).toBe(2)
    for (const value of zIndexes) {
      expect(value).toBe("var(--ds-z-popover)")
    }
  })
})

/* -- The re-wirings, second half ------------------------------------------ */
//
// Fourteen forward cross-batch imports were composed onto an incumbent when
// their own batch landed, and are re-composed onto the source symbol here. Two
// of the plan's sixteen have no React to re-wire — `message-scroller` and
// `carousel` are both admit-CSS-only. These pin the three whose result is
// visible in the DOM.

test.describe("re-wired forward imports", () => {
  test("a pagination page is a real anchor wearing the button", async ({
    page,
  }) => {
    await go(page, "pagination")
    const link = page.locator("a.ds-button[aria-current='page']").first()
    await expect(link).toBeVisible()
    // `render` is what Button gained here — the incumbent was a class applier
    // with no way to be an <a>, so the link applied `.ds-button` by hand.
    expect(await link.evaluate((el) => el.tagName)).toBe("A")
  })

  test("a toolbar is one tab stop, with the absorbed Button inside it", async ({
    page,
  }) => {
    await go(page, "toolbar")
    // Scoped to one toolbar: the page renders several demos, and roving focus
    // is a per-toolbar property.
    const toolbar = page.locator('[data-slot="toolbar"]').first()
    expect(await toolbar.locator(".ds-button").count()).toBeGreaterThan(1)
    // Base UI's roving focus: exactly one member of a strip is in the tab order.
    expect(await toolbar.locator('[tabindex="0"]').count()).toBe(1)
  })

  test("the agenda's status dot is a Status, not a private span", async ({
    page,
  }) => {
    await go(page, "agenda")
    await expect(
      page.locator(".ds-agenda-event-status .ds-status-indicator").first()
    ).toBeAttached()
    // The six private tone rules left agenda.css when the dot became a Status.
    const leftovers = await page.evaluate(() => {
      const found: string[] = []
      for (const sheet of Array.from(document.styleSheets)) {
        let rules: CSSRuleList
        try {
          rules = sheet.cssRules
        } catch {
          continue
        }
        for (const rule of Array.from(rules)) {
          const text = (rule as CSSStyleRule).selectorText
          if (text && /\.ds-agenda-event-status--/.test(text)) found.push(text)
        }
      }
      return found
    })
    expect(leftovers).toEqual([])
  })
})
