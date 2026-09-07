"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cx, type WithClassName } from "../lib/cx.js"

function RadioGroup({ className, ...props }: WithClassName<RadioGroupPrimitive.Props>) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
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