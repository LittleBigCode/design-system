import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldLabel,
  TimePicker,
  type TimeValue,
} from "@diametral/design-system/react"

export default function TimePickerDial() {
  const [time, setTime] = React.useState<TimeValue>({ hours: 14, minutes: 45 })

  return (
    <Field className="w-fit">
      <FieldLabel>Standup</FieldLabel>
      <TimePicker picker="dial" value={time} onValueChange={setTime} />
      <FieldDescription>
        Selected {String(time.hours).padStart(2, "0")}:
        {String(time.minutes).padStart(2, "0")}
      </FieldDescription>
    </Field>
  )
}
