import { Field, NumberInput } from "@diametral/design-system/react"

export default function NumberFieldBasic() {
  return (
    <Field label="Workers" htmlFor="nf-workers">
      <NumberInput id="nf-workers" defaultValue={8} min={1} max={64} step={1} />
    </Field>
  )
}
