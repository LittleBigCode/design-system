/**
 * What the HTML tab is allowed to print — the other half of the codemod in
 * `scripts/build-demo-markup.mjs`.
 *
 * That script scrapes a real rendered DOM, so alongside the contract (the
 * `.ds-*` classes and the `data-*`/`aria-*` hooks `css/` actually styles) it
 * picks up everything React, Base UI and recharts leave behind at runtime:
 * `data-day` on 448 calendar cells, `data-recharts-item-id` on 360 chart marks,
 * `tabindex="0"` re-stated on native `<button>`s. None of that is anything a
 * consumer writing plain HTML against `css/diametral.css` should copy, and
 * printing it under a heading that says "the classes and ARIA a consumer
 * renders" makes the tab lie about its own subject.
 *
 * The keep-list is derived, not declared: `styledDataAttributes()` reads every
 * `[data-*]` selector out of `css/`, so styling a new attribute is all it takes
 * to keep it in the docs. Only the *strip* list is written down, and an
 * attribute in neither fails the build — see the throw in build-demo-markup.mjs.
 */

import fs from "node:fs/promises"
import path from "node:path"

/**
 * Runtime `data-*` attributes: present in the scraped DOM, matched by no
 * selector in `css/`. Measured, not guessed — every name here was counted in
 * the manifest and cross-checked against the stylesheets.
 *
 * An attribute that graduates into the CSS leaves this list automatically:
 * `styledDataAttributes()` wins over it, so a rule keying off `[data-editing]`
 * starts printing `data-editing` with no edit here.
 */
export const RUNTIME_DATA_ATTRIBUTES = new Set([
  // Base UI internals — trigger bookkeeping and composite-widget focus state.
  "data-base-ui-click-trigger",
  "data-base-ui-navigation-menu-trigger",
  "data-base-ui-slider-control",
  "data-base-ui-slider-indicator",
  "data-base-ui-tooltip-trigger",
  "data-composite-item-active",
  "data-focusable",
  "data-has-overflow-y",
  "data-overflow-y-end",
  // react-day-picker's per-cell bookkeeping. The *styled* calendar hooks
  // (data-selected, data-range-start/-end/-middle, data-disabled) are keyed by
  // css/components/calendar.css and stay.
  "data-day",
  "data-month",
  "data-multiple-months",
  "data-outside",
  "data-today",
  // recharts' own mark identifiers, on every <g>, <path> and <rect> it draws.
  "data-recharts-item-id",
  "data-recharts-item-index",
  "data-chart",
  // input-otp's internal slot bookkeeping.
  "data-input-otp",
  "data-input-otp-container",
  "data-input-otp-mse",
  "data-input-otp-mss",
  "data-input-otp-placeholder-shown",
  // Generic runtime state a component sets on itself and styles in JS, or
  // identifiers with no styling meaning at all.
  "data-complete",
  "data-content",
  "data-editing",
  "data-group",
  "data-hidden",
  "data-id",
  "data-index",
  "data-list-empty",
  "data-mode",
  "data-multiple",
  "data-panel",
  "data-panel-open",
  "data-parent",
  "data-progressing",
  "data-separator",
  "data-testid",
  "data-value",
  "data-visible",
])

/** Elements the browser puts in the tab order on their own. An array, not a
 *  Set: it crosses into the browser as a `page.evaluate` argument, which is
 *  structured-cloned, and `Array.includes` is all the check needs. */
export const NATIVELY_FOCUSABLE = [
  "a",
  "button",
  "input",
  "select",
  "summary",
  "textarea",
]

/**
 * Every `data-*` attribute some rule in `css/` selects on. This is the keep-list
 * — the literal definition of "an attribute the stylesheet needs you to write".
 */
export async function styledDataAttributes(cssDir: string): Promise<Set<string>> {
  const found = new Set<string>()
  const walk = async (dir: string): Promise<void> => {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) await walk(full)
      else if (entry.name.endsWith(".css")) {
        const text = await fs.readFile(full, "utf8")
        for (const [, attr] of text.matchAll(/\[(data-[a-z-]+)/g)) found.add(attr)
      }
    }
  }
  await walk(cssDir)
  if (!found.size) {
    throw new Error(
      `[markup-contract] no [data-*] selectors found under ${cssDir} — the ` +
        `keep-list would be empty and every data attribute would be stripped.`
    )
  }
  return found
}

/**
 * Tailwind compiles some utilities through `--tw-*` custom properties, and the
 * codemod's `resolveViaTailwind` prints the whole rule verbatim — so a snippet
 * that claims to need no build step ships `font-variant-numeric: var(--tw-ordinal,)
 * var(--tw-numeric-spacing,) …`, which resolves to nothing without Tailwind
 * loaded. Substituting the sibling values and dropping the plumbing leaves the
 * declaration a plain stylesheet can actually apply.
 */
export function sanitizeStyle(value: string): string {
  const declarations = value
    .split(";")
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => {
      const colon = d.indexOf(":")
      return [d.slice(0, colon).trim(), d.slice(colon + 1).trim()] as const
    })

  const twValues = new Map(
    declarations.filter(([prop]) => prop.startsWith("--tw-"))
  )

  return declarations
    .filter(([prop]) => !prop.startsWith("--tw-"))
    .map(
      ([prop, val]) =>
        [
          prop,
          val
            .replace(/var\((--tw-[a-z-]+)\s*,?\s*\)/g, (_, ref) => twValues.get(ref) ?? "")
            .replace(/\s+/g, " ")
            .trim(),
        ] as const
    )
    .filter(([, val]) => val !== "")
    .map(([prop, val]) => `${prop}: ${val}`)
    .join("; ")
}

/**
 * `tabindex` is behaviour, and this tab's own heading says behaviour is the
 * consumer's to wire. On a `<button>` it is redundant at best and misleading at
 * worst — a roving-tabindex `-1` describes a keyboard implementation, not a
 * class contract. On a `div[role="option"]` it is the only thing making the
 * element reachable at all, so that one stays.
 */
export function keepsTabindex(tagName: string): boolean {
  return !NATIVELY_FOCUSABLE.includes(tagName.toLowerCase())
}

/**
 * What a chart's HTML tab prints instead of its DOM.
 *
 * recharts draws the plot as a full SVG at runtime — `scatter-chart/dense`
 * scraped to 172,682 characters of generated `<path>` data. No consumer can
 * reproduce that from `css/diametral.css`, so printing it is not a markup
 * reference, it is a screenshot in text. The real CSS contract is the wrapper
 * and the series-colour custom properties `ChartContainer` writes, which is
 * what this shows.
 */
export function chartMarkup(
  className: string,
  series: string[]
): string {
  const names = series.length ? series : ["series"]
  const mapping = names
    .map((name, i) => `      --color-${name}: var(--ds-chart-${(i % 5) + 1});`)
    .join("\n")
  return `<!-- recharts draws the plot at runtime, so there is no static markup to copy.
     The CSS contract is this wrapper plus one custom property per series: the
     id is yours to choose, and the rule below is what ChartContainer emits. -->
<div data-slot="chart" data-chart="my-chart" class="${className}">
  <style>
    [data-chart="my-chart"] {
${mapping}
    }
  </style>
  <!-- the responsive container and the recharts SVG mount here -->
</div>`
}
