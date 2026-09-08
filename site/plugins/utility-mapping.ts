/**
 * Tailwind demo class -> `.ds-*` utility, per `docs/absorption/utility-mapping.md`
 * (batch 10, #43). Batch 16 (#49, decision 8) reads this table to codemod the
 * derived HTML tab's wrapper markup — the React tab keeps the Tailwind class
 * verbatim; only the printed HTML tab is rewritten.
 *
 * Gap classes (real, measured, but outside these capped categories — width/
 * height beyond `w-full`, colour, padding/margin, border, font-weight/family,
 * letter-spacing, align-self, flex-grow, grid-template, or anything carrying a
 * variant prefix or an arbitrary value) have no entry here on purpose: the
 * codemod resolves those through Tailwind's own compiler instead (see
 * `resolveViaTailwind` in `derive-markup.ts`) rather than growing this table.
 */
export const UTILITY_MAP: Record<string, string> = {
  flex: "ds-flex",
  "flex-col": "ds-flex-col",
  "flex-row": "ds-flex", // row is ds-flex's default flex-direction
  "flex-wrap": "ds-flex-wrap",
  grid: "ds-grid",
  "items-start": "ds-items-start",
  "items-center": "ds-items-center",
  "items-end": "ds-items-end",
  "items-baseline": "ds-items-baseline",
  "items-stretch": "ds-items-stretch",
  "justify-start": "ds-justify-start",
  "justify-center": "ds-justify-center",
  "justify-between": "ds-justify-between",
  "justify-end": "ds-justify-end",
  "gap-0.5": "ds-gap-1",
  "gap-1": "ds-gap-1",
  "gap-1.5": "ds-gap-2",
  "gap-2": "ds-gap-2",
  "gap-2.5": "ds-gap-3",
  "gap-3": "ds-gap-3",
  "gap-4": "ds-gap-4",
  "gap-5": "ds-gap-5",
  "gap-6": "ds-gap-5",
  "gap-8": "ds-gap-6",
  "gap-10": "ds-gap-7",
  "w-full": "ds-w-full",
  "text-xs": "ds-text-xs",
  "text-sm": "ds-text-sm",
  "text-muted-foreground": "ds-text-muted",
  "text-right": "ds-text-right",
}
