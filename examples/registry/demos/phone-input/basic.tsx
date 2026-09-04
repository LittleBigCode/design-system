import { FormField, PhoneInput } from "@diametral/design-system/react"
export default function PhoneInputBasic() {
  return (
    <FormField label="Phone">
      <PhoneInput defaultValue="+33612345678" />
    </FormField>
  )
}
