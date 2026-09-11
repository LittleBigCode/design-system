"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { CheckIcon } from "@phosphor-icons/react"

import { bcx } from "../lib/baseClass.js"

/* Checkbox — a real tri-state checkbox.
   ---------------------------------------------------------------------------
   Base UI's Checkbox underneath, which is what the applier did not have:
   `indeterminate` is a real third state with the right ARIA, and the check is
   an element that can be transitioned rather than a rotated CSS border.

   The root **is** the box here, where 0.11's `.ds-checkbox` was the label
   around a hidden input. Both markups ship and `checkbox.css` tells them apart
   by whether the root has a `.ds-checkbox__box` child — 0.11's is rendered by
   three committed fixtures and nothing re-classes them.

   0.11's `children` became a label beside the box; here it is a `<FieldLabel
   htmlFor>` or a `<Label htmlFor>` the caller writes. That is the same
   association done explicitly, and it is what let beta.6's `aria-label` fix
   stop being necessary: the label is now an element, not a prop that could be
   dropped. Recipe in `docs/migration/from-0.11.md`. */
function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={bcx("ds-checkbox", className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="ds-checkbox-indicator"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
