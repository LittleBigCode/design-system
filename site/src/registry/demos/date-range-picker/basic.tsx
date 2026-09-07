import { DateRangePicker } from "@diametral/design-system/react"

export default function DateRangePickerBasic() {
  return (
    <DateRangePicker
      defaultValue={{
        from: new Date(2026, 2, 2),
        to: new Date(2026, 2, 19),
      }}
    />
  )
}
