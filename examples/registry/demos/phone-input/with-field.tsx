import {
  FieldDescription,
  FormField,
  PhoneInput,
} from "@diametral/design-system/react"
import * as React from "react"

export default function PhoneInputWithField() {
  const [value, setValue] = React.useState("")

  return (
    <FormField label="Mobile">
      <PhoneInput value={value} onValueChange={setValue} defaultCountry="BE" />
      <FieldDescription>{value || "No number yet."}</FieldDescription>
    </FormField>
  )
}
