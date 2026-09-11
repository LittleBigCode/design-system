"use client"

import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group"

import { bcx } from "../lib/baseClass.js"

/* CheckboxGroup — several checkboxes sharing one value array.
   ---------------------------------------------------------------------------
   Net-new: 0.11 had `.ds-radio-group` and no checkbox equivalent, so this lands
   in clean namespace. Base UI supplies the parent-checkbox behaviour — a "select
   all" whose indeterminate state derives from its children — which is the part
   worth having a component for at all.

   `orientation` is the resolved dedupe exception (2 of batch 7's 6): the source
   kept `flex-col gap-3` as literal Tailwind so a horizontal filter row could
   dedupe them away with `flex-row flex-wrap gap-x-6`. There is no
   `tailwind-merge` here, so the direction is an axis instead of a class race. */
export interface CheckboxGroupProps extends CheckboxGroupPrimitive.Props {
  orientation?: "vertical" | "horizontal"
}

function CheckboxGroup({
  className,
  orientation = "vertical",
  ...props
}: CheckboxGroupProps) {
  return (
    <CheckboxGroupPrimitive
      data-slot="checkbox-group"
      data-orientation={orientation}
      className={bcx("ds-checkbox-group", className)}
      {...props}
    />
  )
}

export { CheckboxGroup }
