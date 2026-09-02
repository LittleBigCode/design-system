/* eslint-disable react-refresh/only-export-components */
import {
  anatomy as ANATOMY,
  anatomyExceptions as EXCEPTIONS,
} from "virtual:demo-source"

import { cx } from "@diametral/design-system/react"

import { Toc, TocItem, TocLabel, TocLink, TocList } from "@/chrome/toc"

import { exampleTitle, type Example } from "@/registry/registry"

export function anatomyFor(slug: string) {
  return ANATOMY[slug]
}

/**
 * Why a part is written nowhere, for the handful of exports whose composition
 * does not exist — a menu portal beside a Content that portals itself. The build
 * refuses any other part with no example, so this is the whole set.
 */
export function exceptionFor(slug: string, part: string) {
  return EXCEPTIONS[`${slug}/${part}`]
}

/**
 * A single part is a component, not a composition — nothing to navigate.
 * Type exports still earn the index: they are part of the import surface, and
 * the lone component row is what carries the part note.
 */
export function hasAnatomy(slug: string) {
  const data = ANATOMY[slug]
  if (!data) return false
  return data.parts.length > 1 || data.types.length > 0
}

/**
 * Highlighting is a generated rule rather than refs and measurement: every part
 * already carries a `data-slot`, so a descendant selector is the whole
 * mechanism. Two intensities share it — `outline` follows the hover, `blur`
 * pins a click by fading everything that neither is nor contains the part.
 * The slot values are build-time literals from the components' own source.
 */
export function PartHighlight({
  outline,
  blur,
}: {
  outline: string[]
  blur: string[]
}) {
  const rules = [
    // The pinned blur transitions; the hover outline is instant on purpose —
    // it tracks the pointer.
    "[data-workbench-preview] [data-slot]{transition:filter .2s,opacity .2s}",
  ]

  for (const slot of outline) {
    rules.push(
      `[data-workbench-preview] [data-slot="${slot}"]{outline:2px solid var(--color-ring);outline-offset:2px}`
    )
  }

  if (blur.length) {
    const target = blur.map((slot) => `[data-slot="${slot}"]`).join(",")
    // Three exemptions, and all three are needed: the part itself, whatever
    // contains it (blurring an ancestor blurs the part with it — `filter`
    // inherits down the box tree), and whatever it contains (a row with a
    // blurred label inside is not an isolated row).
    const inside = blur.map((slot) => `[data-slot="${slot}"] *`).join(",")
    rules.push(
      `[data-workbench-preview] [data-slot]:not(:is(${target})):not(:has(${target})):not(:is(${inside})){filter:blur(1.5px);opacity:.35}`
    )
  }

  return <style>{rules.join("")}</style>
}

/**
 * `panel` -> `Panel`, so a part's own name can be shortened against it.
 */
function componentPrefix(slug: string) {
  return slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("")
}

/**
 * `PanelHeader` -> `Header` under a Panel index. Only when what remains still
 * reads as a name: `Toaster` under a `Toast` prefix would otherwise become `er`.
 */
function shortName(part: string, prefix: string) {
  if (part === prefix || !part.startsWith(prefix)) return part
  const rest = part.slice(prefix.length)
  return /^[A-Z]/.test(rest) ? rest : part
}

type PartEntry = {
  part: string
  label: string
  depth: number
  status?: string
  muted?: boolean
}

/**
 * A playground template is a copyable example, not an exhaustive one, so some
 * parts are only ever written further down the page. Those rows name the section
 * that shows them rather than reading as a dead end. Demo order is the page's
 * own — curated examples first, then the undocumented demos rendered after them
 * — so the badge names the first section a reader would reach.
 */
function shownIn(
  coverage: Record<string, string[]>,
  part: string,
  examples: Example[]
) {
  const documented = examples.map((example) => example.demo)
  const keys = Object.keys(coverage).filter((key) => key !== "playground")
  const ordered = [
    ...documented.filter((key) => keys.includes(key)),
    ...keys.filter((key) => !documented.includes(key)),
  ]
  const key = ordered.find((label) => coverage[label].includes(part))
  return key ? `in ${exampleTitle(key, examples)}` : undefined
}

/**
 * Every part of a component as a flat index: nesting by indentation, names
 * shortened against the component's own, and a status where one is worth
 * saying. Deliberately not JSX — the code strip beside it is the JSX view, and
 * two mirrors of the same tree would read as one thing printed twice.
 */
export function PartIndex({
  slug,
  inTemplate,
  examples,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  slug: string
  /** Parts the playground template renders; the rest are marked, not hidden. */
  inTemplate: string[]
  /** The page's usages, so a part the template omits can name the one showing it. */
  examples: Example[]
  selected: string | null
  hovered: string | null
  onSelect: (part: string) => void
  onHover: (part: string | null) => void
}) {
  const data = ANATOMY[slug]
  if (!data) return null

  const prefix = componentPrefix(slug)
  const placed = new Set<string>()
  const entries: PartEntry[] = []

  for (const row of data.rows) {
    if (row.kind === "close" || placed.has(row.part)) continue
    placed.add(row.part)
    entries.push({
      part: row.part,
      label: shortName(row.part, prefix),
      depth: row.depth,
      // Kept short: the index is sized by its content, so a long status would
      // set the width of the whole column.
      status:
        row.internal || exceptionFor(slug, row.part)
          ? "internal"
          : row.kind === "recurse"
            ? "recurses"
            : inTemplate.includes(row.part)
              ? undefined
              : (shownIn(data.coverage, row.part, examples) ?? "not shown"),
      muted: !row.internal && !inTemplate.includes(row.part),
    })
  }

  // Orphans never made the tree: nothing nests them, so their only claim to a
  // row is the export itself. A demo may still show one at top level.
  for (const part of data.orphans) {
    if (placed.has(part)) continue
    entries.push({
      part,
      label: shortName(part, prefix),
      depth: 1,
      status: exceptionFor(slug, part)
        ? "internal"
        : (shownIn(data.coverage, part, examples) ?? "no example"),
      muted: true,
    })
  }

  return (
    // Sidebar's 23 parts would otherwise set the height of the whole section,
    // so a long index scrolls inside itself instead of stretching the preview.
    <Toc
      aria-label="Components"
      // The grid column is content-sized, so the width comes from the longest
      // row rather than a guess; the cap only matters for the deepest trees.
      className="static max-h-[30rem] w-auto max-w-[13rem] overflow-y-auto p-3"
    >
      <TocLabel className="mb-2">Components</TocLabel>
      <TocList className="gap-0.5">
        {entries.map((entry) => (
          <TocItem key={entry.part}>
            <TocLink
              as="button"
              aria-pressed={selected === entry.part}
              onClick={() => onSelect(entry.part)}
              onMouseEnter={() => onHover(entry.part)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(entry.part)}
              onBlur={() => onHover(null)}
              // Indentation stops at the fourth level: sidebar nests five deep,
              // and past that the label loses more width than the nesting is
              // worth. Inline, so it wins over the component's own `ps-*`.
              style={{
                paddingInlineStart: `${Math.min(entry.depth, 4) * 0.55 + 0.75}rem`,
              }}
              className={cx(
                "w-full cursor-pointer pe-2 text-start text-[13px] leading-snug",
                // A part the template renders reads as present; one it cannot
                // show stays at the muted default.
                !entry.muted && "text-foreground",
                selected === entry.part && "border-foreground text-foreground",
                hovered === entry.part &&
                  selected !== entry.part &&
                  "border-foreground/40 text-foreground"
              )}
            >
              {entry.label}
              {entry.status ? (
                <span className="ms-1.5 text-[10px] text-muted-foreground">
                  {entry.status}
                </span>
              ) : null}
            </TocLink>
          </TocItem>
        ))}
      </TocList>
      {data.types.length ? (
        // Types are import surface, not composition: never a JSX tag, so they
        // get their own list here instead of a dead row in the tree above.
        // Selecting one swaps the note strip to the declaration itself.
        <>
          <TocLabel className="mt-4 mb-2">Types</TocLabel>
          <TocList className="gap-0.5">
            {data.types.map(({ name }) => (
              <TocItem key={name}>
                <TocLink
                  as="button"
                  aria-pressed={selected === name}
                  onClick={() => onSelect(name)}
                  className={cx(
                    "w-full cursor-pointer ps-3 pe-2 text-start font-mono text-xs leading-snug",
                    selected === name && "border-foreground text-foreground"
                  )}
                >
                  {name}
                </TocLink>
              </TocItem>
            ))}
          </TocList>
        </>
      ) : null}
    </Toc>
  )
}
