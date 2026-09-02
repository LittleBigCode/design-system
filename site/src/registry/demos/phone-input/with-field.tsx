import {
  FieldHint,
  FormField,
  PhoneInput,
} from "@diametral/design-system/react"
import * as React from "react"

export default function PhoneInputWithField() {
  const [value, setValue] = React.useState("")

  return (
    <FormField label="Mobile">
      <PhoneInput value={value} onValueChange={setValue} defaultCountry="BE" />
      <FieldHint>{value || "No number yet."}</FieldHint>
    </FormField>
  )
}
