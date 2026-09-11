import * as React from "react"

import { Calendar } from "@diametral/design-system/react"

const DAY_MONTH = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
})

export default function CalendarMultiple() {
  const [days, setDays] = React.useState<Date[]>([
    new Date(2026, 6, 7),
    new Date(2026, 6, 9),
  ])

  return (
    <div className="flex flex-col gap-3">
      <Calendar
        mode="multiple"
        max={3}
        selected={days}
        onSelect={(next) => setDays(next ?? [])}
        defaultMonth={new Date(2026, 6)}
        className="w-fit border border-border"
      />
      <p className="max-w-64 text-sm text-muted-foreground">
        {days.length === 0
          ? "Pick up to three intervention days."
          : `${days.length} of 3 days: ${days.map((day) => DAY_MONTH.format(day)).join(", ")}.`}
      </p>
    </div>
  )
}
