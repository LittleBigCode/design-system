"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cx, type WithClassName } from "../lib/cx.js"

function RadioGroup({
  className,
  name,
  ...props
}: WithClassName<RadioGroupPrimitive.Props>) {
  // Base UI's own `name` has no default — every radio in the group renders
  // with name="", which is not one native group of anything. The incumbent
  // Radio/RadioGroup defaulted it to a generated id; kept here so a group
  // works without the caller having to know to pass one.
  const generatedName = React.useId()
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      name={name ?? generatedName}
      className={cx("ds-radio-group w-full gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: WithClassName<RadioPrimitive.Root.Props>) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cx("peer ds-radio-group-item", className)}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="ds-radio-group-indicator"
      >
        <span className="ds-radio-group-dot" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }