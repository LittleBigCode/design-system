import * as React from "react"
import { SpinnerIcon } from "@phosphor-icons/react"

import { cx } from "../lib/cx.js"

/* Spinner — the glyph itself turns, rather than a ruled ring turning around it.
   ---------------------------------------------------------------------------
   `label` is the accessible name, not decoration: a spinner is often the only
   thing on screen saying anything is happening, so it says what. 0.x carried
   the same prop. Hardcoding "Loading" is right for a page and wrong for the
   third spinner in a settings list, which is why it stays overridable. */
function Spinner({
  className,
  label = "Loading",
  ...props
}: React.ComponentProps<"svg"> & { label?: string }) {
  return (
    <SpinnerIcon
      data-slot="spinner"
      role="status"
      aria-label={label}
      className={cx("ds-spinner", className)}
      {...props}
    />
  )
}

export { Spinner }
