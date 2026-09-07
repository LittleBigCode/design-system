"use client"

import * as React from "react"

import { useControllableValue } from "../hooks/useControllableValue.js"
import { cx } from "../lib/cx.js"
import { Calendar } from "./calendar.js"
import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "./date-picker.js"
import { TimePicker, type TimeValue } from "./time-picker.js"

/** Midnight on the same day, for comparing a bound's date half. */
const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate())

/** `date`'s day with `time`'s clock, as one Date. */
function withTime(date: Date, time: TimeValue) {
  const next = new Date(date)
  next.setHours(time.hours, time.minutes, time.seconds ?? 0, 0)
  return next
}

/** Round `minutes` down to the nearest `step`, as v1's TimePicker did. */
const snap = (minutes: number, step: number) =>
  step > 1 ? Math.floor(minutes / step) * step : minutes

// One Date from the separate DatePicker and TimePicker, standing in for
// v0.11's combined DateTimePicker. Both halves already exist; the work here
// is the combined value.
//
// The bounds are the reason this is a component rather than two side by side.
// v0.11 forwarded only the *date* half of `min`/`max` to its DatePicker, so a
// `min` of 09:00 still let you pick 08:00 on the first allowed day. Here the
// calendar disables whole days outside the range and the clock is clamped
// again on commit, so the bound holds across the date *and* the time.
function DateTimePicker({
  className,
  value,
  defaultValue,
  onChange,
  min,
  max,
  step = 5,
  disabled,
  datePlaceholder,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> & {
  value?: Date
  defaultValue?: Date
  onChange?: (value: Date | undefined) => void
  min?: Date
  max?: Date
  /** Minute increment for the time half. */
  step?: number
  disabled?: boolean
  datePlaceholder?: string
}) {
  const [current, setCurrent] = useControllableValue<Date | undefined>({
    value,
    defaultValue,
    onChange,
  })
  const [open, setOpen] = React.useState(false)

  const clamp = (next: Date) => {
    if (min && next < min) return new Date(min)
    if (max && next > max) return new Date(max)
    return next
  }

  const time: TimeValue = current
    ? { hours: current.getHours(), minutes: current.getMinutes() }
    : { hours: 0, minutes: 0 }

  return (
    <div
      data-slot="date-time-picker"
      className={cx("ds-date-time-picker", className)}
      {...props}
    >
      <DatePicker open={open} onOpenChange={setOpen}>
        <DatePickerTrigger
          value={current}
          disabled={disabled}
          placeholder={datePlaceholder}
        />
        <DatePickerContent>
          <Calendar
            mode="single"
            selected={current}
            defaultMonth={current}
            disabled={[
              ...(min ? [{ before: startOfDay(min) }] : []),
              ...(max ? [{ after: startOfDay(max) }] : []),
            ]}
            onSelect={(day) => {
              setCurrent(day ? clamp(withTime(day, time)) : undefined)
              setOpen(false)
            }}
          />
        </DatePickerContent>
      </DatePicker>

      <TimePicker
        value={time}
        disabled={disabled || !current}
        onValueChange={(next) => {
          // No day yet means no datetime to move: the time half stays inert
          // until the calendar has answered, rather than inventing today.
          if (!current) return
          setCurrent(
            clamp(
              withTime(current, { ...next, minutes: snap(next.minutes, step) })
            )
          )
        }}
      />
    </div>
  )
}

export { DateTimePicker }
