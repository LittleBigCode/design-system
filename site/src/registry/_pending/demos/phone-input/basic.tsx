import { PhoneInput } from "@diametral/ui/components/phone-input"
import { Field, FieldLabel } from "@diametral/ui/components/field"

export default function PhoneInputBasic() {
  return (
    <Field className="max-w-sm">
      <FieldLabel>Phone</FieldLabel>
      <PhoneInput defaultValue="+33612345678" />
    </Field>
  )
}
