import {
  DateRangePicker,
  Field,
  FieldLabel,
} from "@diametral/design-system/react"

export default function DateRangePickerWithTime() {
  return (
    <Field className="w-fit">
      <FieldLabel>Booking window</FieldLabel>
      <DateRangePicker
        defaultValue={{
          from: new Date(2026, 6, 6, 9, 0),
          to: new Date(2026, 6, 6, 17, 30),
        }}
        showTime
        numberOfMonths={1}
      />
    </Field>
  )
}
