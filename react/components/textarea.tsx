import * as React from "react"

import { cx } from "../lib/cx.js"

/* Textarea — a multi-line field that grows with what is typed.
   ---------------------------------------------------------------------------
   `field-sizing: content` is what the source brings and it is the whole point:
   the box follows the text instead of holding a fixed six rows and scrolling.
   `textarea.css` keeps 0.11's `min-height` as the floor and its `resize:
   vertical` grip, which the source dropped — on a published class that would
   have taken away an affordance the docs teach.

   `rows` still works, and has to be re-created rather than passed through:
   `field-sizing: content` makes the browser ignore it, so it becomes a
   `min-height` of that many line boxes plus the element's own vertical chrome.
   `--ds-textarea-chrome` is that chrome; `input-group.css` re-declares it,
   because an input-group textarea has different padding. */

export interface TextareaProps extends React.ComponentProps<"textarea"> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, rows, style, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        rows={rows}
        style={
          rows
            ? {
                minHeight: `calc(${rows} * 1lh + var(--ds-textarea-chrome, 22px))`,
                ...style,
              }
            : style
        }
        className={cx("ds-textarea", className)}
        {...props}
      />
    )
  }
)

export { Textarea }
