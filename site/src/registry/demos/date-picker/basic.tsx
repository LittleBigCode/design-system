import * as React from "react"
import {
  Calendar,
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "@diametral/design-system/react"

const MIN = new Date(2026, 0, 1)
const MAX = new Date(2026, 11, 31)

export default function DatePickerBasic() {
  const [value, setValue] = React.useState<Date | undefined>(
    new Date(2026, 2, 19)
  )
  const [open, setOpen] = React.useState(false)

  return (
    <DatePicker open={open} onOpenChange={setOpen}>
      <DatePickerTrigger value={value} />
      <DatePickerContent>
        <Calendar
          mode="single"
          selected={value}
          defaultMonth={value}
          disabled={[{ before: MIN }, { after: MAX }]}
          onSelect={(day) => {
            setValue(day)
            setOpen(false)
          }}
        />
      </DatePickerContent>
    </DatePicker>
  )
}
