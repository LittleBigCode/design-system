import { Field, FieldLabel, TimePicker } from "@diametral/design-system/react"

export default function TimePickerSeconds() {
  return (
    <Field className="w-fit">
      <FieldLabel>Duration</FieldLabel>
      <TimePicker
        defaultValue={{ hours: 0, minutes: 5, seconds: 30 }}
        showSeconds
      />
    </Field>
  )
}
