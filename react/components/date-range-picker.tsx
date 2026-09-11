"use client"

import { format } from "date-fns"
import { CalendarBlankIcon } from "@phosphor-icons/react"

import { cx } from "../lib/cx.js"
import { useControllableValue } from "../hooks/useControllableValue.js"
import { Button } from "./button.js"
import { Calendar } from "./calendar.js"
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js"
import { TimePicker, type TimeValue } from "./time-picker.js"

// Structurally identical to react-day-picker's `DateRange` — declared locally
// since Calendar's own range mode is a passthrough, not a type this package owns.
type DateRange = { from: Date | undefined; to?: Date | undefined }

// Unlike DatePicker (Popover only, Calendar left to the caller), this owns its
// own range state — the `showTime` pair of Time Pickers is why it needs to.
function DateRangePicker({
  className,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date range",
  dateFormat = "PP",
  showTime = false,
  numberOfMonths = 2,
}: {
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (value: DateRange) => void
  placeholder?: string
  dateFormat?: string
  showTime?: boolean
  numberOfMonths?: number
  className?: string
}) {
  const [range, setRange] = useControllableValue<DateRange>({
    value,
    defaultValue: defaultValue ?? { from: undefined, to: undefined },
    onChange: onValueChange,
  })

  const withTime = showTime ? `${dateFormat}, p` : dateFormat
  // A same-day range only needs its date printed once, which is the common
  // shape once `showTime` is on — "Jul 6, 2026, 9:00 AM – 5:30 PM".
  const sameDay =
    range.from &&
    range.to &&
    range.from.toDateString() === range.to.toDateString()

  const label = range.from
    ? range.to
      ? sameDay
        ? showTime
          ? `${format(range.from, withTime)} – ${format(range.to, "p")}`
          : format(range.from, dateFormat)
        : `${format(range.from, withTime)} – ${format(range.to, withTime)}`
      : format(range.from, withTime)
    : undefined

  const setTime = (part: "from" | "to") => (time: TimeValue) => {
    const current = range[part]
    if (!current) return
    const next = new Date(current)
    next.setHours(time.hours, time.minutes, time.seconds ?? 0)
    setRange({ ...range, [part]: next })
  }

  return (
    <Popover>
      <PopoverTrigger
        data-slot="date-range-picker-trigger"
        render={<Button variant="outline" />}
        className={cx(
          "ds-date-range-picker-trigger",
          showTime ? "w-96" : "w-72",
          className
        )}
      >
        <span
          className={cx(
            "ds-date-range-picker-label",
            !label && "ds-date-range-picker-label--placeholder"
          )}
        >
          {label ?? placeholder}
        </span>
        <CalendarBlankIcon
          data-icon="inline-end"
          className="ds-date-range-picker-trigger-icon"
        />
      </PopoverTrigger>
      <PopoverContent
        data-slot="date-range-picker-content"
        align="start"
        className="ds-date-range-picker-content"
      >
        <Calendar
          mode="range"
          numberOfMonths={numberOfMonths}
          selected={range}
          defaultMonth={range.from}
          onSelect={(next) =>
            setRange(next ?? { from: undefined, to: undefined })
          }
        />
        {showTime && (
          <div
            data-slot="date-range-picker-times"
            className="ds-date-range-picker-times"
          >
            <TimePicker
              aria-label="Start time"
              value={{
                hours: range.from?.getHours() ?? 0,
                minutes: range.from?.getMinutes() ?? 0,
              }}
              onValueChange={setTime("from")}
              disabled={!range.from}
            />
            <span
              aria-hidden="true"
              className="ds-date-range-picker-times-separator"
            >
              –
            </span>
            <TimePicker
              aria-label="End time"
              value={{
                hours: range.to?.getHours() ?? 0,
                minutes: range.to?.getMinutes() ?? 0,
              }}
              onValueChange={setTime("to")}
              disabled={!range.to}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export { DateRangePicker }
export type { DateRange }
