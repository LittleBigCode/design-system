import { Field, FieldLabel, MultiSelect } from "@diametral/design-system/react"

const SCOPES = [
  { value: "read", label: "Read" },
  { value: "write", label: "Write" },
  { value: "deploy", label: "Deploy" },
  { value: "billing", label: "Billing" },
  { value: "admin", label: "Admin", disabled: true },
]

export default function MultiSelectBasic() {
  return (
    <Field>
      <FieldLabel htmlFor="ms-scopes">Token scopes</FieldLabel>
      <MultiSelect
        id="ms-scopes"
        options={SCOPES}
        defaultValue={["read", "write"]}
        placeholder="Select scopes…"
      />
    </Field>
  )
}
