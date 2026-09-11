import * as React from "react"
import {
  Calendar,
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/design-system/react"

const ORDERED = new Date(2026, 6, 6)
const LATEST = new Date(2026, 8, 30)

export default function DatePickerBounded() {
  const [date, setDate] = React.useState<Date | undefined>()
  const [open, setOpen] = React.useState(false)

  return (
    <Field className="max-w-sm">
      <FieldLabel>Delivery date</FieldLabel>
      <DatePicker open={open} onOpenChange={setOpen}>
        <DatePickerTrigger
          value={date}
          dateFormat="PPPP"
          placeholder="Choose a delivery date"
          className="w-72"
        />
        <DatePickerContent>
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={ORDERED}
            startMonth={ORDERED}
            endMonth={LATEST}
            disabled={[{ before: ORDERED }, { after: LATEST }]}
            onSelect={(value) => {
              setDate(value)
              setOpen(false)
            }}
          />
        </DatePickerContent>
      </DatePicker>
      <FieldDescription>Between 6 July and 30 September 2026.</FieldDescription>
    </Field>
  )
}
