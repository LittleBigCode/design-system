import { Field, FieldLabel, TimePicker } from "@diametral/design-system/react"

export default function TimePickerList() {
  return (
    <Field className="w-fit">
      <FieldLabel>Cut-off</FieldLabel>
      <TimePicker
        picker="list"
        defaultValue={{ hours: 17, minutes: 0, seconds: 0 }}
        showSeconds
      />
    </Field>
  )
}
