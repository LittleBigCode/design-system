import * as React from "react"

import { cx } from "../lib/cx.js"

/* Masonry — `columns` becomes a `--columns` custom property, so any integer
   works with no responsive breakpoint list to maintain (same trick as
   AspectRatio's `--ratio`). Items break across CSS multi-column layout;
   `break-inside: avoid` in masonry.css keeps each child intact rather than
   splitting it across two columns. */
function Masonry({
  columns = 3,
  className,
  ...props
}: React.ComponentProps<"div"> & { columns?: number }) {
  return (
    <div
      data-slot="masonry"
      style={{ "--columns": columns } as React.CSSProperties}
      className={cx("ds-masonry", className)}
      {...props}
    />
  )
}

export { Masonry }
