"use client"

import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field"

import { cx, type WithClassName } from "../lib/cx.js"
import { Button } from "./button.js"
import { MinusIcon, PlusIcon } from "@phosphor-icons/react"

function NumberField({ className, ...props }: WithClassName<NumberFieldPrimitive.Root.Props>) {
  return (
    <NumberFieldPrimitive.Root
      data-slot="number-field"
      className={cx("ds-number-field w-full", className)}
      {...props}
    />
  )
}

function NumberFieldGroup({
  className,
  ...props
}: WithClassName<NumberFieldPrimitive.Group.Props>) {
  return (
    <NumberFieldPrimitive.Group
      data-slot="number-field-group"
      className={cx("ds-number-field-group", className)}
      {...props}
    />
  )
}

function NumberFieldInput({
  className,
  ...props
}: WithClassName<NumberFieldPrimitive.Input.Props>) {
  return (
    <NumberFieldPrimitive.Input
      data-slot="number-field-input"
      className={cx("ds-number-field-input px-2 text-center", className)}
      {...props}
    />
  )
}

function NumberFieldDecrement({
  className,
  children,
  ...props
}: WithClassName<NumberFieldPrimitive.Decrement.Props>) {
  return (
    <NumberFieldPrimitive.Decrement
      data-slot="number-field-decrement"
      render={<Button variant="ghost" size="icon-sm" />}
      className={cx("ds-number-field-decrement", className)}
      {...props}
    >
      {children ?? <MinusIcon />}
    </NumberFieldPrimitive.Decrement>
  )
}

function NumberFieldIncrement({
  className,
  children,
  ...props
}: WithClassName<NumberFieldPrimitive.Increment.Props>) {
  return (
    <NumberFieldPrimitive.Increment
      data-slot="number-field-increment"
      render={<Button variant="ghost" size="icon-sm" />}
      className={cx("ds-number-field-increment", className)}
      {...props}
    >
      {children ?? <PlusIcon />}
    </NumberFieldPrimitive.Increment>
  )
}

function NumberFieldScrubArea({
  className,
  children,
  ...props
}: WithClassName<NumberFieldPrimitive.ScrubArea.Props>) {
  return (
    <NumberFieldPrimitive.ScrubArea
      data-slot="number-field-scrub-area"
      className={cx("ds-number-field-scrub-area", className)}
      {...props}
    >
      {children}
      <NumberFieldPrimitive.ScrubAreaCursor
        data-slot="number-field-scrub-area-cursor"
        className="ds-number-field-scrub-area-cursor"
      />
    </NumberFieldPrimitive.ScrubArea>
  )
}

export {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldScrubArea,
}
