import { DateRangePicker } from "@diametral/design-system/react"

export default function DateRangePickerBasic() {
  return (
    <DateRangePicker
      defaultValue={{ start: "2026-03-02", end: "2026-03-19" }}
      min="2026-01-01"
      max="2026-12-31"
    />
  )
}
