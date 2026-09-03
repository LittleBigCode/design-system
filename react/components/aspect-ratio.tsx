"use client"

import * as React from "react"

import { cx } from "../lib/cx.js"

/* Aspect ratio — holds a box at a fixed ratio while its contents load, so the
   page does not reflow when the image arrives. `ratio` becomes a `--ratio`
   custom property rather than a variant class, so any value works. */
function AspectRatio({
  ratio,
  className,
  ...props
}: React.ComponentProps<"div"> & { ratio: number }) {
  return (
    <div
      data-slot="aspect-ratio"
      style={{ "--ratio": ratio } as React.CSSProperties}
      className={cx("ds-aspect-ratio", className)}
      {...props}
    />
  )
}

export { AspectRatio }