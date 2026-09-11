import * as React from "react"

import { Calendar } from "@diametral/design-system/react"

const SEASON_OPENS = new Date(2026, 6, 1)
const CLOSURES = [
  new Date(2026, 6, 14),
  { from: new Date(2026, 6, 20), to: new Date(2026, 6, 24) },
]

export default function CalendarBlockedDays() {
  const [selected, setSelected] = React.useState<Date | undefined>(
    new Date(2026, 6, 8)
  )

  return (
    <div className="flex flex-col gap-3">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        defaultMonth={SEASON_OPENS}
        disabled={[
          { before: SEASON_OPENS },
          { dayOfWeek: [0, 6] },
          ...CLOSURES,
        ]}
        className="w-fit border border-border"
      />
      <p className="max-w-64 text-sm text-muted-foreground">
        Closed at weekends, on 14 July and for the summer break from the 20th to
        the 24th.
      </p>
    </div>
  )
}
