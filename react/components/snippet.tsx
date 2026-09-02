import * as React from "react"
import { CopyIcon } from "@phosphor-icons/react"

import { CodeBlockCopyButton } from "./CodeBlock.js"
import { cx } from "../lib/cx.js"

/* Snippet — a single-line copyable value: an API key, a CLI command, an ID.
   Built on the copy affordance `.ds-code` already ships rather than
   reimplementing the clipboard fallback.

   The source imported the held `code-block`'s `CodeBlockCopyButton`. This
   repo's `CodeBlock` baked the same button inline, so the re-composition
   extracted it into a real export (react/components/CodeBlock.tsx) instead of
   duplicating `copyText`. Light surface, so `.ds-snippet-copy-button`
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
      <CodeBlockCopyButton
        value={value}
        label="Copy"
        className="ds-snippet-copy-button"
      >
        <CopyIcon />
      </CodeBlockCopyButton>
    </div>
  )
}

export { Snippet }
