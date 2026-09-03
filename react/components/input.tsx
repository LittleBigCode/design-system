import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cx } from "../lib/cx.js"

/* Input — the system's text field.
   ---------------------------------------------------------------------------
   Moved out of `react/index.tsx` in 1.0.0-beta.7, and its stylesheet moved out
   of `field.css` into `input.css`, the first of `form-controls.css`'s seven
   destinations. The class is `.ds-input` on both sides of the absorption, so
   nothing about the contract moves — which is what made the ledger's "four-way
   dedupe" row withdraw as one-way.

   Base UI's Input underneath, which is what the applier did not have: it keeps
   a controlled value in sync across a re-render without the caret jumping to
   the end, the defect every hand-rolled controlled input eventually hits.

   `number` stays as a prop rather than becoming `type="number"` only: it is
   0.11's published API and it applies `.ds-input--number`, which is the
   right-aligned tabular treatment, not the input type. */

export interface InputProps extends React.ComponentProps<"input"> {
  /** Right-aligned, fixed-width numeric field (`.ds-input--number`). */
  number?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, number, type, ...props },
  ref
) {
  return (
    <InputPrimitive
      ref={ref}
      type={type}
      data-slot="input"
      className={cx("ds-input", number && "ds-input--number", className)}
      {...props}
    />
  )
})

export { Input }
