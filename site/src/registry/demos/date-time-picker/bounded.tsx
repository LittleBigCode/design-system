import { useState } from "react"
import {
  DateTimePicker,
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/design-system/react"

const MIN = new Date(2026, 7, 10, 9, 0)
const MAX = new Date(2026, 7, 14, 17, 30)

export default function DateTimePickerBounded() {
  const [slot, setSlot] = useState<Date | undefined>(
    new Date(2026, 7, 11, 14, 0)
  )

  return (
    <Field className="max-w-md">
      <FieldLabel>Appointment</FieldLabel>
      <DateTimePicker value={slot} onChange={setSlot} min={MIN} max={MAX} />
      <FieldDescription>
        10–14 August, 09:00 to 17:30. Days outside the window are disabled in
        the calendar and the clock is clamped on commit, so 08:00 on the 10th is
        not reachable either.
      </FieldDescription>
    </Field>
  )
}
