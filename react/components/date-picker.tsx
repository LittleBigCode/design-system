"use client"

import * as React from "react"
import { format } from "date-fns"

import { cx, type WithClassName } from "../lib/cx.js"
import { Button } from "./button.js"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover.js"
import { CalendarBlankIcon } from "@phosphor-icons/react"

const DatePicker = Popover

function DatePickerTrigger({
  className,
  value,
  placeholder = "Pick a date",
  dateFormat = "PP",
  children,
  ...props
}: Omit<WithClassName<React.ComponentProps<typeof PopoverTrigger>>, "value"> & {
  value?: Date
  placeholder?: string
  dateFormat?: string
}) {
  return (
    <PopoverTrigger
      data-slot="date-picker-trigger"
      render={<Button variant="outline" />}
      className={cx("ds-date-picker-trigger w-56", className)}
      {...props}
    >
      {children ?? (
        <span className={cx(!value && "ds-date-picker-value--placeholder")}>
          {value ? format(value, dateFormat) : placeholder}
        </span>
      )}
      <CalendarBlankIcon
        data-icon="inline-end"
        className="ds-date-picker-trigger-icon"
      />
    </PopoverTrigger>
  )
}

function DatePickerContent({
  className,
  align = "start",
  ...props
}: React.ComponentProps<typeof PopoverContent>) {
  return (
    <PopoverContent
      data-slot="date-picker-content"
      align={align}
      className={cx("ds-date-picker-content", className)}
      {...props}
    />
  )
}

export { DatePicker, DatePickerTrigger, DatePickerContent }
