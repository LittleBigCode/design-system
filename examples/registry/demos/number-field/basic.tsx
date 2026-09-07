import {
  Field,
  FieldLabel,
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@diametral/design-system/react"

export default function NumberFieldBasic() {
  return (
    <Field>
      <FieldLabel htmlFor="nf-workers">Workers</FieldLabel>
      <NumberField id="nf-workers" defaultValue={8} min={1} max={64} step={1}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </Field>
  )
}
