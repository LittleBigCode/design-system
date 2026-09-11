import * as React from "react"
import {
  Button,
  DateRangePicker,
  Field,
  FieldLabel,
  type DateRange,
} from "@diametral/design-system/react"

const TODAY = new Date(2026, 6, 17)

function daysBefore(count: number) {
  const date = new Date(TODAY)
  date.setDate(date.getDate() - count)
  return date
}

const PRESETS = [
  { label: "Last 7 days", range: { from: daysBefore(6), to: TODAY } },
  { label: "Last 30 days", range: { from: daysBefore(29), to: TODAY } },
  { label: "This month", range: { from: new Date(2026, 6, 1), to: TODAY } },
]

export default function DateRangePickerPresets() {
  const [range, setRange] = React.useState<DateRange>({
    from: daysBefore(6),
    to: TODAY,
  })

  return (
    <Field className="w-fit">
      <FieldLabel>Reporting period</FieldLabel>
      <DateRangePicker value={range} onValueChange={setRange} />
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <Button
            key={preset.label}
            size="xs"
            variant="outline"
            onClick={() => setRange(preset.range)}
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </Field>
  )
}
