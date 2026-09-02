import { DatePicker } from "@diametral/design-system/react"

export default function DatePickerBasic() {
  return (
    <DatePicker
      defaultValue="2026-03-19"
      min="2026-01-01"
      max="2026-12-31"
      placeholder="Pick a date"
    />
  )
}
