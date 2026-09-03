"use client"

import { cx } from "../lib/cx.js"

import type * as React from "react"

/* ----------------------------------------------------------------------------
   Skeleton — the batch's cross-boundary pin, and its smallest component.

   The React binding goes to the source; `skeleton.css` is HELD, because
   `DataGrid` (a held component) renders `.ds-skeleton--text` for its loading
   rows. The pin does not follow the file's name, which is what makes these the
   cases worth checking: `DataGrid.tsx:321` writes the two classes as a string
   literal rather than composing this component, so swapping the binding cannot
   reach it either way.

   What the swap costs, and why it is the same trade every applier in this
   migration makes: 0.11's Skeleton took `variant`, `width`, `height` and
   `count` props. The absorbed one takes a `className` and spreads the rest, so
   the held stylesheet's grammar is addressed by class rather than by prop —
   `<Skeleton className="ds-skeleton--text" />` — and `count` becomes a `map`.
   Recipes for all four are in docs/migration/from-0.11.md.

   One thing does NOT survive absorption verbatim: the source's Skeleton is a
   shadcn component sized by Tailwind utilities (`h-4 w-full`), and this package
   ships none. A bare `<Skeleton />` would therefore have rendered a zero-height
   box. skeleton.css gains one additive rule giving an unmodified `.ds-skeleton`
   the line size that was 0.11's default, scoped `:not([class*="ds-skeleton--"])`
   so it can never outrank a modifier — `DataGrid` always writes one.
   ---------------------------------------------------------------------------- */

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cx("ds-skeleton", className)}
      {...props}
    />
  )
}

export { Skeleton }