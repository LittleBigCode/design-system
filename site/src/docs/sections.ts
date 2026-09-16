import { BLOCKS as BLOCK_REGISTRY } from "@/registry/blocks"

/**
 * The flat doc sections, as `[slug, name, description]` rows. Lifted out of the
 * index pages they render because the sidebar reads the same rows: one list
 * means a new page cannot appear in the grid but be missing from the nav, and a
 * renamed slug breaks in one place. A `.ts` module rather than an export beside
 * a component, so Fast Refresh keeps working on the index pages.
 */
export type SectionItem = readonly [slug: string, name: string, description: string]

export const FOUNDATIONS = [
  ["color", "Color", "Brand primitives, the neutral UI ramp, and the semantic tokens components read."],
  ["typography", "Typography", "Ufficio titles, Geist body, uppercase labels, tabular numerals."],
  ["spacing", "Spacing", "The eight-step px scale lifted from the source app."],
  ["layout", "Layout", "Max-width containers, the two-column grid, sticky chrome."],
  ["borders", "Borders & rules", "Structure from 1px rules in two weights — never shadows."],
  ["grid", "Grid system", "Ruled columns, stat grids, framed edges, registration marks."],
  ["motion", "Motion", "Short .2–.25s transitions and one restrained fade-in."],
  ["no-radius", "No radius", "border-radius: 0 everywhere, on one token."],
  ["logo", "Logo", "Circle, square, diagonal line — the mark and its wordmark."],
  ["iconography", "Iconography", "1.5-stroke line icons on a 24-unit grid."],
  ["photography", "Photography", "Natural macro textures — warm wood, cool ice and water."],
] as const satisfies readonly SectionItem[]

/**
 * Derived, not restated: the block registry owns the categories (ADR 0003), and
 * the sidebar only needs each one's first three fields.
 */
export const BLOCKS: readonly SectionItem[] = BLOCK_REGISTRY.map(
  ([category, name, description]) => [category, name, description] as const
)
