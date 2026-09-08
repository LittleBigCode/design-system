import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  Input,
  RadioGroup,
  RadioGroupItem,
} from "@diametral/design-system/react"

const METHODS = [
  { value: "card", label: "Back to the original card" },
  { value: "credit", label: "Studio credit" },
  { value: "transfer", label: "Bank transfer" },
]

export default function RadioGroupDependentField() {
  const [method, setMethod] = React.useState("card")

  return (
    <FieldSet className="w-full max-w-sm">
      <FieldLegend>Refund method</FieldLegend>
      <RadioGroup
        value={method}
        onValueChange={(value) => setMethod(value as string)}
      >
        {METHODS.map((option) => (
          <Field key={option.value} orientation="horizontal">
            <RadioGroupItem
              id={`radio-refund-${option.value}`}
              value={option.value}
            />
            <FieldLabel htmlFor={`radio-refund-${option.value}`}>
              {option.label}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
      {method === "transfer" && (
        <Field>
          <FieldLabel htmlFor="radio-refund-iban">IBAN</FieldLabel>
          <Input
            id="radio-refund-iban"
            placeholder="FR76 3000 6000 0112 3456"
          />
          <FieldDescription>Transfers settle in three days.</FieldDescription>
        </Field>
      )}
    </FieldSet>
  )
}
