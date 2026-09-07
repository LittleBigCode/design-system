"use client"

import { cx } from "../lib/cx.js"

import type * as React from "react"

/* ----------------------------------------------------------------------------
   Skeleton.

   Was the batch 8 cross-boundary pin: `skeleton.css` held because `DataGrid`
   (also held then) wrote `"ds-skeleton ds-skeleton--text"` as a string literal
   for its loading rows, reaching no React binding either way. Batch 9 voided
   that hold along with every other frozen/incumbent-holds verdict and flipped
   `skeleton.css` to source's own file outright; batch 13 (#46) removes
   `DataGrid` itself, so nothing renders `--text` any more and the file is a
   plain, unheld replacement — no accommodating rule to keep in sync.

   What the swap costs, and why it is the same trade every applier in this
   migration makes: 0.11's Skeleton took `variant`, `width`, `height` and
   `count` props. The absorbed one takes a `className` and spreads the rest,
   so a caller addresses the stylesheet's grammar by class rather than by
   prop, and `count` becomes a `map`. Recipes for all four are in
   docs/migration/from-0.11.md.
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