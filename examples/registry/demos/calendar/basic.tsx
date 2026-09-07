import * as React from "react"
import {
  Calendar,
  CalendarDayButton,
} from "@diametral/design-system/react"

// Fixed rather than derived from `new Date()`: the visual suite diffs a
// screenshot of this demo, and a month that moves would fail every month.
const MONTH = new Date(2026, 2, 1)

const EVENTS: Record<string, "info" | "warning" | "success" | "danger"> = {
  "2026-03-04": "info",
  "2026-03-11": "warning",
  "2026-03-19": "success",
  "2026-03-26": "danger",
}

const key = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`

export default function CalendarBasic() {
  const [selected, setSelected] = React.useState<Date | undefined>(
    new Date(2026, 2, 19)
  )

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      defaultMonth={MONTH}
      weekStartsOn={1}
      components={{
        DayButton: (props) => {
          const status = EVENTS[key(props.day.date)]
          return (
            <CalendarDayButton {...props}>
              {props.day.date.getDate()}
              {status && (
                <span
                  aria-hidden="true"
                  className={`ds-calendar-event-dot ds-calendar-event-dot--${status}`}
                />
              )}
            </CalendarDayButton>
          )
        },
      }}
    />
  )
}
