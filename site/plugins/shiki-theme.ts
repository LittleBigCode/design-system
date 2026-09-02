import type { ThemeRegistrationRaw } from "shiki"

/**
 * Two code themes built from declared Diametral tokens rather than an
 * off-the-shelf palette, so a snippet reads as part of the system.
 *
 * Deliberately only six token roles — the charter is flat and restrained, and a
 * twelve-colour rainbow would fight it. Light mode leans on the chart ramp;
 * dark mode leans on the brand *secondaries* (rouge/vert/bleu/beige), which
 * exist precisely for vivid-on-dark use.
 *
 * Every role must clear WCAG AA (4.5:1) against the surface a code block sits
 * on — `bg-muted`, i.e. --ds-bg-alt (#f5f5f5 light, #1b1c1f dark). The chart
 * ramp is tuned for *white* and three of its light values do not survive the
 * step onto #f5f5f5, so light mode uses the "ink" variants below. Dark mode
 * clears AA on the raw secondaries and is left alone.
 */

const LIGHT = {
  fg: "#161616", // --ds-black            16.60:1
  // Not --ds-grey-brand (#767884, 4.02:1) — the same decoupling --ds-ink-faint makes.
  faint: "#6c6f7d", // --ds-ink-faint     4.58:1
  keyword: "#7b5ea7", // --ds-chart-5     4.81:1
  string: "#2e7d4f", // --ds-chart-3      4.63:1
  // Not --ds-red-brand (#ff2a00, 3.45:1). Signal red at text weight is --ds-red,
  // which is what --ds-danger already resolves to.
  tag: "#c0392b", // --ds-red             4.99:1
  // Not --ds-info (#1488a6, 3.78:1) — see --ds-info-ink in globals.css.
  attr: "#0f6d85", // --ds-info-ink       5.43:1
}

const DARK = {
  fg: "#f3f3f1", // --ds-ink (dark)      15.34:1
  faint: "#8b8d97", // --ds-ink-faint     5.16:1
  keyword: "#23e2ff", // --ds-blue       10.87:1
  string: "#89fc79", // --ds-green-brand        13.20:1
  tag: "#ff2a00", // --ds-red-brand           4.53:1
  attr: "#d5d3c4", // --ds-beige         11.31:1
}

function theme(
  name: string,
  type: "light" | "dark",
  c: typeof LIGHT
): ThemeRegistrationRaw {
  return {
    name,
    type,
    // Transparent: the surrounding surface token provides the background, so
    // code blocks inherit card/muted styling instead of punching a hole in it.
    colors: { "editor.foreground": c.fg, "editor.background": "#00000000" },
    settings: [
      {
        scope: ["comment", "punctuation.definition.comment"],
        settings: { foreground: c.faint, fontStyle: "italic" },
      },
      {
        scope: [
          "keyword",
          "keyword.control",
          "storage.type",
          "storage.modifier",
          "keyword.operator.expression",
          "keyword.operator.new",
          "variable.language",
        ],
        settings: { foreground: c.keyword },
      },
      {
        scope: [
          "string",
          "string.template",
          "punctuation.definition.string",
          "string.quoted",
        ],
        settings: { foreground: c.string },
      },
      {
        // JSX component tags and type names both name things the design system
        // exports, so they share the brand signal colour.
        scope: [
          "entity.name.tag",
          "support.class.component",
          "entity.name.type",
          "entity.name.class",
          "support.type",
        ],
        settings: { foreground: c.tag },
      },
      {
        scope: [
          "entity.other.attribute-name",
          "constant.numeric",
          "constant.language",
          "meta.object-literal.key",
        ],
        settings: { foreground: c.attr },
      },
      {
        scope: [
          "punctuation",
          "meta.brace",
          "punctuation.separator",
          "punctuation.terminator",
          "punctuation.definition.tag",
          "keyword.operator",
        ],
        settings: { foreground: c.faint },
      },
      {
        scope: [
          "entity.name.function",
          "support.function",
          "variable",
          "variable.other",
        ],
        settings: { foreground: c.fg },
      },
    ],
  }
}

export const diametralLight = theme("diametral-light", "light", LIGHT)
export const diametralDark = theme("diametral-dark", "dark", DARK)

/**
 * Shipped to the client through the virtual module so the playground's runtime
 * tokenizer paints with these exact hexes. Without this the colour table would
 * be duplicated in CSS and drift from the themes above.
 */
export const palette = { light: LIGHT, dark: DARK }
