import { Field, FieldLabel, PhoneInput } from "@diametral/design-system/react"
export default function PhoneInputBasic() {
  return (
    <Field>
      <FieldLabel>Phone</FieldLabel>
      <PhoneInput defaultValue="+33612345678" />
    </Field>
  )
}
