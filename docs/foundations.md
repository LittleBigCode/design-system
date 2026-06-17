# Foundations

The primitives the whole system is built on — color, type, space, layout, line, motion, the
mark, icons, and imagery. All values are `--ds-*` tokens defined in
[`../css/tokens.css`](../css/tokens.css) and sourced from
[`../tokens/tokens.json`](../tokens/tokens.json); see [`../tokens/README.md`](../tokens/README.md)
for the three-tier model. Each section links to its live page in the showcase.

## Color

Three tiers: charter-canonical **brand primitives**, a **neutral UI ramp**, and the
**semantic** tokens components actually read. The brand palette is canonical for brand hues
(accent `--ds-accent` = `#FF2A00`); the muted status hues come from the source app. One accent
only — the signal red — used sparingly for the tab underline, focus, and selection.

Key tokens: `--ds-ink`, `--ds-ink-soft`, `--ds-ink-faint`, `--ds-bg`, `--ds-bg-alt`,
`--ds-surface`, `--ds-rule`, `--ds-rule-soft`, `--ds-accent`, and the status families
`--ds-success` / `--ds-warning` / `--ds-danger` / `--ds-critical` / `--ds-neutral` /
`--ds-info` (each with a `*-bg` tint).

Live: [../examples/foundations/color.html](../examples/foundations/color.html)

## Typography

Two voices, one weight idea. **Ufficio Light 300** carries titles (light and large); **Geist**
carries body (quiet). Titles render via the `.ds-title` utility (`--xl` / `--lg` / `--md` /
`--sm`); structure is marked with the signature uppercase `.ds-label` / `.ds-kicker` at
`0.08em` tracking. Ufficio is license-gated — if `ufficio.css` is not imported, titles fall
back to the free **Fraunces** stack.

Key tokens: `--ds-font-title`, `--ds-font-sans`, `--ds-font-weight-title`, `--ds-text-2xs` …
`--ds-text-2xl`, `--ds-leading-tight`, `--ds-leading-normal`.

Live: [../examples/foundations/typography.html](../examples/foundations/typography.html)

## Spacing

A small, fixed pixel scale lifted from the source app, applied to padding, gaps, and rhythm.
Eight steps run from a 4px hairline gap up to an 80px section break, keeping vertical and
horizontal spacing on a shared, predictable grid.

Key tokens: `--ds-space-1` (4px), `--ds-space-2` (8px), `--ds-space-3` (12px), `--ds-space-4`
(16px), `--ds-space-5` (24px), `--ds-space-6` (32px), `--ds-space-7` (40px), `--ds-space-8`
(80px).

Live: [../examples/foundations/spacing.html](../examples/foundations/spacing.html)

## Layout

Centered, max-width content with a sticky application bar. Three max-widths frame the page, the
content column, and the modal; a single named breakpoint governs the responsive shift. Because
CSS variables can't drive `@media`, `--ds-bp-md` is mirrored by hard-coded media queries.

Key tokens: `--ds-maxw-page` (1440px), `--ds-maxw-content` (1180px), `--ds-maxw-modal` (860px),
`--ds-bp-md` (940px), plus elevation `--ds-z-header` / `--ds-z-overlay`.

Live: [../examples/foundations/layout.html](../examples/foundations/layout.html)

## Borders & rules

Separation is structural, not elevated: **1px hairlines and no shadows.** A standard rule
divides regions and frames surfaces; a softer rule separates rows inside a group. Backgrounds
shift to `--ds-bg-alt` where a sunken surface is needed — never a drop shadow.

Key tokens: `--ds-rule` (`#cdced0`), `--ds-rule-soft` (`#e4e4e6`), and `--ds-ink` for the
strongest 1px boundaries (table header underline, modal/status borders).

**No radius:** every corner in the system is square, driven by the single `--ds-radius-none`
token — see [no-radius.md](no-radius.md).

Live: [../examples/foundations/borders.html](../examples/foundations/borders.html)

## Motion

Short and functional. Two easing durations cover transitions; one entrance animation
(`ds-fadein`) is used for revealed content such as tab panes. `prefers-reduced-motion` is
respected.

Key tokens: `--ds-transition` (`.2s ease`), `--ds-transition-slow` (`.25s ease`).

Live: [../examples/foundations/motion.html](../examples/foundations/motion.html)

## Logo

The Diametral mark is three elements: the **circle** (the space of intelligence and
complexity), the **square** (the structure that brings stability), and the **line**
(Diametral's clear positioning). In product it appears as the `.ds-wordmark` — a square
`.ds-wordmark__mark` SVG beside the Ufficio `.ds-wordmark__name`, optionally with an uppercase
`.ds-wordmark__sub`. The mark inherits ink color and stays flat and monochrome.

Key tokens: `--ds-font-title`, `--ds-font-weight-title`, `--ds-ink`, `--ds-rule`.

Live: [../examples/foundations/logo.html](../examples/foundations/logo.html)

## Iconography

Icons follow the line: thin, square-cut, monochrome strokes that sit naturally beside text and
inherit `currentColor`. They match the 1px-rule aesthetic — no fills, no rounded terminals, no
duotone — so they read as part of the same flat system rather than as decoration.

Key tokens: `currentColor` (driven by `--ds-ink` / `--ds-ink-faint`), `--ds-rule`.

Live: [../examples/foundations/iconography.html](../examples/foundations/iconography.html)

## Photography

Direction is **natural macro texture** — organic and material, never tech cliché. Two registers
anchor the brand: **warm walnut wood** and **cool arctic ice / water**. Shoot close, let the
material fill the frame, and avoid renders, device mockups, and stock-tech imagery. See
[brand-and-voice.md](brand-and-voice.md) for the full direction.

Live: [../examples/foundations/photography.html](../examples/foundations/photography.html)
