import * as React from "react"

import { Calendar } from "@diametral/design-system/react"

type Range = { from: Date | undefined; to?: Date | undefined }

export default function CalendarRange() {
  const [range, setRange] = React.useState<Range | undefined>({
    from: new Date(2026, 6, 6),
    to: new Date(2026, 6, 17),
  })

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
      captionLayout="dropdown"
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
      className="w-fit border border-border"
    />
  )
}
