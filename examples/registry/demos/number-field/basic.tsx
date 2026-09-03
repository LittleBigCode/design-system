import { Field, FieldLabel, NumberInput } from "@diametral/design-system/react"

export default function NumberFieldBasic() {
  return (
    <Field>
      <FieldLabel htmlFor="nf-workers">Workers</FieldLabel>
      <NumberInput id="nf-workers" defaultValue={8} min={1} max={64} step={1} />
    </Field>
  )
}
