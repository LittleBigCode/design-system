import * as React from "react"

import { cx } from "../lib/cx.js"
import { variants } from "../lib/variants.js"

/* Tag — a tinted boxed label, as opposed to Badge's bare typographic one.
   ---------------------------------------------------------------------------
   `ds-tag` and `ds-tag--success` are both in the set `docs/streamlit.md`
   publishes for Python consumers to hand-write, so the box and that modifier
   are frozen (css-ledger §1).

   The absorption is the **tone axis completing itself**: `neutral` and
   `critical` join the four 0.11 had, so a tag can say any of the six things
   every other status surface in the system can say. The prop is renamed
   `status` -> `tone` to match `Banner`, `Alert` and `Meter`, which all took
   `tone` when they landed; `status` still works and still maps, because it is
   published API with call sites in `examples/`.

   `onRemove` is 0.11's and has no source equivalent. It stays: a tag you can
   dismiss is the whole point of a filter chip, and the source's tag cannot. */
const tagVariants = variants("ds-tag", {
  variants: {
    tone: {
      neutral: "ds-tag--neutral",
      info: "ds-tag--info",
      success: "ds-tag--success",
      warning: "ds-tag--warning",
      danger: "ds-tag--danger",
      critical: "ds-tag--critical",
    },
  },
  defaultVariants: {},
})

export type TagTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "critical"

export interface TagProps extends React.ComponentProps<"span"> {
  /** Status family — colored border, matching text and tinted background. */
  tone?: TagTone
  /** @deprecated Renamed `tone` in 1.0.0-beta.7, and widened to six values.
   *  Still accepted and still mapped. */
  status?: "info" | "success" | "warning" | "danger"
  /** Render a trailing × button; called when it is clicked. */
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { tone, status, onRemove, className, children, ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      data-slot="tag"
      className={tagVariants({
        tone: tone ?? status,
        className: cx(onRemove && "ds-tag--removable", className),
      })}
      {...rest}
    >
      {children}
      {onRemove ? (
        <button
          className="ds-tag__remove"
          type="button"
          aria-label="Remove"
          onClick={onRemove}
        >
          ×
        </button>
      ) : null}
    </span>
  )
})

export { Tag, tagVariants }
