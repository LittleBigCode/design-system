import { DateTimePicker } from "@diametral/design-system/react"

export default function DateTimePickerBasic() {
  return <DateTimePicker defaultValue={new Date(2026, 2, 19, 14, 0)} step={15} />
}
