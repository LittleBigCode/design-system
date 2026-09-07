"use client"

import * as React from "react"

import { CodeBlockCopyButton } from "./code-block.js"
import { cx } from "../lib/cx.js"

/* Snippet — a single-line copyable value: an API key, a CLI command, an ID.
   Built on the copy affordance `.ds-code` already ships rather than
   reimplementing the clipboard fallback.

   `CodeBlockCopyButton` swapped in batch 13 (#46): it no longer takes
   `children`/`label`, it always renders its own check/copy `Icon` and manages
   the "copied" state itself. Light surface, so `.ds-snippet-copy-button`
   overrides the dark-panel colours it wears there. */
function Snippet({
  className,
  value,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  value: string
  children?: React.ReactNode
}) {
  return (
    <div data-slot="snippet" className={cx("ds-snippet", className)} {...props}>
      <code data-slot="snippet-code" className="ds-snippet-code">
        {children ?? value}
      </code>
      <CodeBlockCopyButton value={value} className="ds-snippet-copy-button" />
    </div>
  )
}

export { Snippet }