import * as React from "react"
import {
  Calendar,
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
  Field,
  FieldLabel,
} from "@diametral/design-system/react"

type Range = { from: Date | undefined; to?: Date | undefined }

const DAY_MONTH = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
})
const FULL = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

export default function DatePickerRange() {
  const [range, setRange] = React.useState<Range | undefined>()

  const label = range?.from
    ? range.to
      ? `${DAY_MONTH.format(range.from)} – ${FULL.format(range.to)}`
      : FULL.format(range.from)
    : undefined

  return (
    <Field className="max-w-sm">
      <FieldLabel>Mission dates</FieldLabel>
      <DatePicker>
        <DatePickerTrigger className="w-72">
          <span className={label ? undefined : "text-muted-foreground"}>
            {label ?? "Pick a range"}
          </span>
        </DatePickerTrigger>
        <DatePickerContent>
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
          />
        </DatePickerContent>
      </DatePicker>
    </Field>
  )
}
