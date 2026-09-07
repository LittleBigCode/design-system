// Batch 3's own decisions, as opposed to Base UI's behaviour.
//
// Three of the fifteen absorbed components replace a symbol this package
// already exported — `button-group`, `icon-button` and `wordmark` — and four
// more compose onto an incumbent because the source component they wanted
// arrives in batch 7: `editable`, `field-array`, `phone-input` and, in its one
// demo, `carousel`. The first blocks are what says those re-wirings are still
// in place and have not quietly reverted to a source symbol.
//
// The rest guards work paid on the way in that nothing else would catch: six
// resolved dedupe exceptions, two stylesheet-only class contracts, the
// `.ds-label` namespace merge, and the theme and escape-hatch defects.

import { expect, test } from "@playwright/test"
import { routePath, settle } from "./harness"

/* -- The replaced appliers ------------------------------------------------- */

test.describe("button-group replaces the applier", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routePath("/docs/button-group"))
    await settle(page)
  })

  test("the group is a role=group carrying data-orientation", async ({
    page,
  }) => {
    const group = page.locator('[data-slot="button-group"]').first()
    await expect(group).toBeVisible()
    await expect(group).toHaveAttribute("role", "group")
    // The seam is keyed to this attribute, so a group without it is a plain row.
    await expect(group).toHaveAttribute("data-orientation", "horizontal")
  })

  test("the shared edge removes a border rather than overlapping members", async ({
    page,
  }) => {
    // The incumbent used margin-left: -1px. Its replacement zeroes the losing
    // border with a logical property, which is what makes the seam RTL-correct;
    // a negative margin here would mean the old rules came back.
    const second = page
      .locator('[data-slot="button-group"] > .ds-button')
      .nth(1)
    await expect(second).toBeVisible()
    const box = await second.evaluate((el) => {
      const s = getComputedStyle(el)
      return { start: s.borderInlineStartWidth, margin: s.marginLeft }
    })
    expect(box.start).toBe("0px")
    expect(box.margin).toBe("0px")
  })

  test("the separator composes .ds-separator--auto, not a Tailwind literal", async ({
    page,
  }) => {
    // The one dedupe exception this batch owed in TSX. Batch 2 landed the
    // modifier for it; a literal `data-vertical:h-auto` class here would mean
    // the exception was carried across instead of resolved.
    const sep = page.locator('[data-slot="button-group-separator"]').first()
    if ((await sep.count()) === 0) test.skip()
    await expect(sep).toHaveClass(/ds-separator--auto/)
    const cls = await sep.getAttribute("class")
    expect(cls).not.toMatch(/data-(horizontal|vertical):/)
    expect(cls).not.toMatch(/\bbg-input\b/)
    // --auto is what lets the rule size itself to the group rather than filling
    // the cross axis: it is 1px wide and exactly as tall as its neighbours.
    const [rule, button] = await Promise.all([
      sep.boundingBox(),
      page.locator('[data-slot="button-group"] > .ds-button').first().boundingBox(),
    ])
    expect(rule?.width).toBeCloseTo(1, 0)
    expect(rule?.height).toBeCloseTo(button!.height, 0)
  })

  test("the text cell is not a control", async ({ page }) => {
    const text = page.locator('[data-slot="button-group-text"]').first()
    if ((await text.count()) === 0) test.skip()
    await expect(text).toBeVisible()
    // No tab stop: it names its neighbour, it is not a thing to activate.
    expect(await text.evaluate((el) => el.tabIndex)).toBeLessThan(0)
  })

  test("the split action's menu is this repo's .ds-menu", async ({ page }) => {
    // The source's dropdown-menu holds. A menu that is not .ds-menu means the
    // held component was imported after all.
    await page
      .locator('[aria-label="Other deploy targets"]')
      .first()
      .click()
    await expect(page.locator(".ds-menu").first()).toBeVisible()
  })
})

test.describe("icon-button replaces the applier", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routePath("/docs/icon-button"))
    await settle(page)
  })

  test("every icon button carries an accessible name", async ({ page }) => {
    // The whole point of the component, on both sides of the absorption:
    // `label` is required in the type and lands on aria-label and title.
    const buttons = page.locator('[data-slot="icon-button"]')
    const count = await buttons.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      const b = buttons.nth(i)
      const label = await b.getAttribute("aria-label")
      expect(label, `icon button ${i} has no aria-label`).toBeTruthy()
      await expect(b).toHaveAttribute("title", label!)
    }
  })

  test("the source's icon- size spellings resolve onto the square boxes", async ({
    page,
  }) => {
    // `icon-` is stripped, so icon-sm is .ds-button--sm and icon alone is the
    // 40px default. A raw `ds-button--icon-sm` class would style nothing.
    const sm = page.locator('[data-slot="icon-button"].ds-button--sm').first()
    await expect(sm).toBeVisible()
    await expect(sm).toHaveClass(/ds-button--icon\b/)
    expect(await page.locator('[class*="ds-button--icon-"]').count()).toBe(0)
  })

  test("icon-xs is a real 24px square, not an unstyled class", async ({
    page,
  }) => {
    // .ds-button--xs is net-new CSS this batch added for the source's size.
    const xs = page.locator('[data-slot="icon-button"].ds-button--xs').first()
    if ((await xs.count()) === 0) test.skip()
    const box = await xs.boundingBox()
    expect(box?.width).toBeCloseTo(24, 0)
    expect(box?.height).toBeCloseTo(24, 0)
  })
})

test.describe("wordmark replaces the placeholder mark", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routePath("/docs/wordmark"))
    await settle(page)
  })

  test("the real lockup renders, not the circle-square-line placeholder", async ({
    page,
  }) => {
    const mark = page.locator('[data-slot="wordmark"]').first()
    await expect(mark).toBeVisible()
    // The placeholder was a <circle>, a <rect> and a <line>. The real lockups
    // are paths, on one of two viewBoxes.
    const svg = mark.locator("svg").first()
    expect(await svg.locator("circle, rect, line").count()).toBe(0)
    expect(await svg.locator("path").count()).toBeGreaterThan(0)
    expect(await svg.getAttribute("viewBox")).toMatch(
      /^0 0 (2751 519|1770 1769)$/,
    )
  })

  test("the paths are currentColor so ink recolours the mark", async ({
    page,
  }) => {
    const fill = await page
      .locator('[data-slot="wordmark"] svg path[fill]')
      .first()
      .getAttribute("fill")
    expect(fill).toBe("currentColor")
  })

  test("svg sizing is a real declaration keyed to data-variant", async ({
    page,
  }) => {
    // The dedupe exception this file owed: the source kept `[&_svg]:h-5` and
    // `[&_svg]:size-8` literal on its cva. A zero-height svg here would mean
    // the literal was carried across and now styles nothing.
    for (const variant of ["horizontal", "square"] as const) {
      const svg = page
        .locator(`[data-slot="wordmark"][data-variant="${variant}"] svg`)
        .first()
      if ((await svg.count()) === 0) continue
      const box = await svg.boundingBox()
      expect(box?.height, `${variant} svg has no height`).toBeGreaterThan(8)
    }
  })

  test("a mark beside its own name is decorative", async ({ page }) => {
    // Announcing "Diametral" twice is worse than not announcing it. Both
    // label="" and a `name` beside the mark drop the svg out of the tree.
    const beside = page
      .locator('[data-slot="wordmark"]')
      .filter({ has: page.locator(".ds-wordmark__name") })
      .first()
    if ((await beside.count()) === 0) test.skip()
    await expect(beside.locator("svg").first()).toHaveAttribute(
      "aria-hidden",
      "true",
    )
  })
})

/* -- The forward re-wirings ------------------------------------------------ */

test.describe("editable composes onto IconButton", () => {
  test("the pencil is an IconButton with a required name", async ({ page }) => {
    await page.goto(routePath("/docs/editable"))
    await settle(page)
    // The source used `Button variant="ghost" size="icon-xs"` with an
    // aria-label it had to remember. IconButton cannot ship without one.
    const pencil = page.locator('[data-slot="editable"] [aria-label="Edit"]').first()
    await expect(pencil).toBeVisible()
    await expect(pencil).toHaveAttribute("data-slot", "icon-button")
  })

  test("the pencil is reachable by keyboard despite opacity 0", async ({
    page,
  }) => {
    await page.goto(routePath("/docs/editable"))
    await settle(page)
    // .ds-editable-edit-button is invisible until hover; :focus-visible is what
    // keeps it usable, so losing that rule would hide a working control.
    const pencil = page.locator('[data-slot="editable"] [aria-label="Edit"]').first()
    await pencil.focus()
    await expect(pencil).toHaveCSS("opacity", "1")
  })

  test("Escape restores the committed value rather than the draft", async ({
    page,
  }) => {
    await page.goto(routePath("/docs/editable"))
    await settle(page)
    const root = page.locator('[data-slot="editable"]').first()
    const before = (await root.locator('[data-slot="editable-preview"]').innerText()).trim()
    await root.locator('[aria-label="Edit"]').click()
    const input = root.locator('[data-slot="editable-input"]')
    await input.fill("something else")
    await input.press("Escape")
    await expect(root.locator('[data-slot="editable-preview"]')).toHaveText(before)
  })
})

test.describe("field-array composes onto the incumbents", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routePath("/docs/field-array"))
    await settle(page)
  })

  test("remove is an IconButton naming its own entry", async ({ page }) => {
    const removes = page.locator('[data-slot="field-array-remove"]')
    const count = await removes.count()
    expect(count).toBeGreaterThan(1)
    const names = new Set<string>()
    for (let i = 0; i < count; i++) {
      const label = await removes.nth(i).getAttribute("aria-label")
      expect(label).toBeTruthy()
      names.add(label!)
    }
    // A stack of buttons all reading "Remove" tells a screen reader nothing.
    expect(names.size).toBe(count)
  })

  test("the two dedupe exceptions are real declarations, not literals", async ({
    page,
  }) => {
    // The source kept `flex items-center` on the item and `flex` on the content
    // literal so tailwind-merge could dedupe them. They are the class's own
    // defaults here, and no literal crossed over.
    const item = page.locator('[data-slot="field-array-item"]').first()
    await expect(item).toHaveCSS("display", "flex")
    await expect(item).toHaveCSS("align-items", "center")
    expect(await item.getAttribute("class")).not.toMatch(/\bitems-center\b/)

    const content = page
      .locator('[data-slot="field-array-item-content"]')
      .first()
    await expect(content).toHaveCSS("display", "flex")
    // min-width: 0 is load-bearing — without it a long value pushes the remove
    // button out of the block.
    await expect(content).toHaveCSS("min-width", "0px")
  })

  test("removing an entry keeps the values below it put", async ({ page }) => {
    // The keys come off a stable entry id, not the index. Keyed by index,
    // removing the first row makes React reuse the wrong node and the values
    // below it shift up by one — which is what this catches. Scoped to the
    // basic demo: the playground's remove button carries no handler.
    const demo = page.locator('[data-slot="field-array"]').filter({
      has: page.locator('input[name="diplomas[0].title"]'),
    })
    const titles = demo.locator('[data-slot="field-array-item"] input[name$=".title"]')
    const second = (await titles.nth(1).inputValue()).trim()
    expect(second).toBeTruthy()
    await demo.locator('[data-slot="field-array-remove"]').first().click()
    await expect(titles).toHaveCount(1)
    await expect(titles.first()).toHaveValue(second)
  })
})

test.describe("phone-input composes onto the native Select", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routePath("/docs/phone-input"))
    await settle(page)
  })

  test("the country picker is a native select, not a listbox", async ({
    page,
  }) => {
    // The source's five-part Select holds until batch 7. A [role=combobox]
    // trigger here would mean the held component was imported.
    const root = page.locator('[data-slot="phone-input"]').first()
    await expect(root).toBeVisible()
    await expect(root.locator("select").first()).toBeVisible()
    expect(await root.locator('[role="combobox"], [role="listbox"]').count()).toBe(0)
  })

  test("both halves are named and neither draws its own border", async ({
    page,
  }) => {
    // This batch's largest dedupe exception: the source kept `border-0 ps-0
    // pe-2` and `flex-1 border-0 ps-2` literal because select.css and input.css
    // kept their own defaults literal in turn. Both are real declarations now,
    // so the group draws the single underline and the members draw none.
    const root = page.locator('[data-slot="phone-input"]').first()
    const country = root.locator(".ds-phone-input__country").first()
    const number = root.locator(".ds-phone-input__number").first()
    await expect(root.locator("select")).toHaveAttribute(
      "aria-label",
      "Country calling code",
    )
    await expect(number).toHaveAttribute("aria-label", "Phone number")
    for (const part of [country, number]) {
      const widths = await part.evaluate((el) => {
        const s = getComputedStyle(el)
        return [s.borderTopWidth, s.borderRightWidth, s.borderBottomWidth, s.borderLeftWidth]
      })
      expect(widths.every((w) => w === "0px")).toBe(true)
    }
    // The single underline belongs to the group.
    await expect(root).toHaveCSS("border-bottom-width", "1px")
    for (const part of [country, number]) {
      expect(await part.getAttribute("class")).not.toMatch(/\b(border-0|ps-0|pe-2|flex-1|w-fit|shrink-0)\b/)
    }
  })

  test("the value is one string carrying the dial code", async ({ page }) => {
    const root = page.locator('[data-slot="phone-input"]').first()
    const number = root.locator("input").first()
    await number.fill("612345678")
    // Changing the country rewrites the dial code and keeps the national part.
    await root.locator("select").selectOption("BE")
    await expect(number).toHaveValue("612345678")
    await expect(root.locator("select")).toHaveValue("BE")
  })
})

/* -- The two stylesheet-only class contracts ------------------------------- */

test.describe("carousel ships CSS with no binding", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routePath("/docs/carousel"))
    await settle(page)
  })

  test("the page prints no import line", async ({ page }) => {
    // exports: [] is what tells the page there is nothing to import. An import
    // line here would be promising Carousel* symbols that do not exist.
    await expect(page.locator("main")).not.toContainText(
      "import { Carousel }",
    )
  })

  test("the gutter is the track's negative margin against the item's padding", async ({
    page,
  }) => {
    // Not a `gap`: a gap on the track would double the spacing, and there would
    // be room before the first slide.
    const track = page.locator(".ds-carousel-content").first()
    await expect(track).toHaveCSS("display", "flex")
    await expect(track).toHaveCSS("margin-left", "-16px")
    await expect(track).toHaveCSS("column-gap", "normal")
    await expect(page.locator(".ds-carousel-item").first()).toHaveCSS(
      "padding-left",
      "16px",
    )
  })

  test("--third is a real basis, replacing the literal basis-1/3", async ({
    page,
  }) => {
    const item = page.locator(".ds-carousel-item--third").first()
    await expect(item).toBeVisible()
    await expect(item).toHaveCSS("flex-basis", "33.3333%")
    expect(await item.getAttribute("class")).not.toMatch(/basis-/)
  })

  test("the controls are named IconButtons outside the viewport", async ({
    page,
  }) => {
    // The source hid the name in an sr-only span; this package has none, so the
    // name is IconButton's required label.
    for (const name of ["Previous slide", "Next slide"]) {
      const control = page.locator(`[aria-label="${name}"]`).first()
      await expect(control).toHaveClass(/ds-carousel-control/)
      await expect(control).toHaveCSS("position", "absolute")
    }
  })
})

test.describe("input-otp ships CSS with no binding", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routePath("/docs/input-otp"))
    await settle(page)
  })

  test("the page prints no import line", async ({ page }) => {
    await expect(page.locator("main")).not.toContainText("import { InputOTP }")
  })

  test("one real input carries the value, the slots only display it", async ({
    page,
  }) => {
    const root = page.locator(".ds-input-otp").first()
    await expect(root).toBeVisible()
    expect(await root.locator("input").count()).toBe(1)
    expect(await root.locator(".ds-input-otp-slot").count()).toBe(6)
    // The boxes are aria-hidden because the input already announces the value.
    await expect(root.locator(".ds-input-otp-group").first()).toHaveAttribute(
      "aria-hidden",
      "true",
    )
  })

  test("data-active draws the focused underline and the caret", async ({
    page,
  }) => {
    const active = page.locator('.ds-input-otp-slot[data-active="true"]').first()
    await expect(active).toBeVisible()
    await expect(active.locator(".ds-input-otp-slot-caret-line")).toBeVisible()
    const [activeColor, restColor] = await Promise.all([
      active.evaluate((el) => getComputedStyle(el).borderBottomColor),
      page
        .locator(".ds-input-otp-slot:not([data-active])")
        .first()
        .evaluate((el) => getComputedStyle(el).borderBottomColor),
    ])
    expect(activeColor).not.toBe(restColor)
  })
})

/* -- Work paid on the way in ---------------------------------------------- */

test.describe("the .ds-label namespace merge", () => {
  test("the incumbent's type survives the absorption", async ({ page }) => {
    // .ds-label was already defined in base/typography.css — the charte's
    // signature small-caps treatment. components/label.css adds the flex row
    // and the state overrides and deliberately does not restate the type, so
    // weight 600 or tighter tracking here would mean it overwrote a published
    // contract instead of merging with it.
    await page.goto(routePath("/docs/label"))
    await settle(page)
    const label = page.locator(".ds-label").first()
    await expect(label).toBeVisible()
    await expect(label).toHaveCSS("font-weight", "400")
    await expect(label).toHaveCSS("letter-spacing", /0\.9[56]px/)
    await expect(label).toHaveCSS("text-transform", "uppercase")
    // What the absorption did add: the row, so an aside can sit beside the words.
    await expect(label).toHaveCSS("display", "flex")
  })

  test("a label after a disabled control dims without a marker class", async ({
    page,
  }) => {
    // Upstream this was `.peer:disabled ~ .ds-label`; nothing here applies
    // `.peer`, so it would have landed inert. It reads :disabled directly.
    await page.goto(routePath("/docs/label"))
    await settle(page)
    const dimmed = page.locator(":disabled ~ .ds-label").first()
    if ((await dimmed.count()) === 0) test.skip()
    await expect(dimmed).toHaveCSS("opacity", "0.5")
  })

  test("a label inside a disabled group dims too", async ({ page }) => {
    await page.goto(routePath("/docs/label"))
    await settle(page)
    const dimmed = page.locator('[data-disabled="true"] .ds-label').first()
    if ((await dimmed.count()) === 0) test.skip()
    await expect(dimmed).toHaveCSS("opacity", "0.5")
  })
})

test.describe("toggle's charte edits", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routePath("/docs/toggle"))
    await settle(page)
  })

  test("aria-pressed carries the state, not a modifier class", async ({
    page,
  }) => {
    const pressed = page.locator('[data-slot="toggle"][aria-pressed="true"]').first()
    const rest = page.locator('[data-slot="toggle"][aria-pressed="false"]').first()
    await expect(pressed).toBeVisible()
    const [on, off] = await Promise.all([
      pressed.evaluate((el) => getComputedStyle(el).backgroundColor),
      rest.evaluate((el) => getComputedStyle(el).backgroundColor),
    ])
    expect(on).not.toBe(off)
  })

  test("focus is a 2px outline, not a colour ring in box-shadow", async ({
    page,
  }) => {
    // The source focused with a 3px box-shadow; the charte focuses with an
    // outline on --ds-focus-ring.
    const toggle = page.locator('[data-slot="toggle"]').first()
    await toggle.focus()
    const style = await toggle.evaluate((el) => {
      const s = getComputedStyle(el)
      return { outline: s.outlineWidth, shadow: s.boxShadow }
    })
    expect(style.outline).toBe("2px")
    expect(style.shadow).toBe("none")
  })

  test("the icon sizing has no Tailwind escape hatch left", async ({
    page,
  }) => {
    // `svg:not([class*="size-"])` silently skipped any icon whose class merely
    // contained `size-`. The rule is unconditional now, so every glyph sizes.
    const svg = page.locator('[data-slot="toggle"] svg').first()
    if ((await svg.count()) === 0) test.skip()
    const box = await svg.boundingBox()
    expect(box?.width).toBeCloseTo(14, 0)
  })
})

test.describe("meter reads a fill token, not a text token", () => {
  test("a toned indicator paints a real colour", async ({ page }) => {
    // The source's six tone keys read the --ds-*-ink family — the text shade,
    // and only four of the six exist here. They read --ds-*-solid, the family
    // tuned for fills, so an unset custom property would leave the bar
    // --ds-accent and this comparison would fail.
    await page.goto(routePath("/docs/meter"))
    await settle(page)
    const toned = page.locator('[class*="ds-meter--tone-"]').first()
    if ((await toned.count()) === 0) test.skip()
    const indicator = toned.locator(".ds-meter-indicator").first()
    const plain = page
      .locator('[data-slot="meter"]:not([class*="ds-meter--tone-"]) .ds-meter-indicator')
      .first()
    if ((await plain.count()) === 0) test.skip()
    const [a, b] = await Promise.all([
      indicator.evaluate((el) => getComputedStyle(el).backgroundColor),
      plain.evaluate((el) => getComputedStyle(el).backgroundColor),
    ])
    expect(a).not.toBe(b)
    expect(a).not.toBe("rgba(0, 0, 0, 0)")
  })

  test("the value row is tabular so it does not jitter", async ({ page }) => {
    await page.goto(routePath("/docs/meter"))
    await settle(page)
    await expect(page.locator(".ds-meter-value").first()).toHaveCSS(
      "font-variant-numeric",
      "tabular-nums",
    )
  })
})

test.describe("relative-time's parsing contract", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(routePath("/docs/relative-time"))
    await settle(page)
  })

  test("a SQL timestamp with microseconds parses like the Date does", async ({
    page,
  }) => {
    // The reason the component normalises rather than handing the string to
    // Date: engines disagree on a space separator and on microseconds. Every
    // parseable row on the page describes the same instant, so they must agree.
    // Scoped to the demo that lists every shape of one instant; the other
    // demos on the page carry their own dates.
    const texts = await page
      .locator("dl [data-slot='relative-time']:not([data-invalid])")
      .allInnerTexts()
    const parseable = texts.map((t) => t.trim()).filter(Boolean)
    expect(parseable.length).toBeGreaterThan(3)
    expect(new Set(parseable).size).toBe(1)
  })

  test("an unparseable value renders as it arrived instead of crashing", async ({
    page,
  }) => {
    const bad = page.locator("[data-slot='relative-time'][data-invalid]").first()
    await expect(bad).toBeVisible()
    await expect(bad).toHaveText("last tuesday-ish")
    // No dateTime, because there is no date — and no thrown toISOString().
    expect(await bad.getAttribute("datetime")).toBeNull()
  })

  test("every valid instance carries the exact time in its title", async ({
    page,
  }) => {
    const ok = page.locator("[data-slot='relative-time']:not([data-invalid])")
    const count = await ok.count()
    for (let i = 0; i < count; i++) {
      expect(await ok.nth(i).getAttribute("title")).toBeTruthy()
      expect(await ok.nth(i).getAttribute("datetime")).toBeTruthy()
    }
  })
})
