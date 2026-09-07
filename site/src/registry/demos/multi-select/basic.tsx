import { Field, FieldLabel, MultiSelect } from "@diametral/design-system/react"

const SCOPES = [
  { value: "read", label: "Read" },
  { value: "write", label: "Write" },
  { value: "deploy", label: "Deploy" },
  { value: "billing", label: "Billing" },
  { value: "admin", label: "Admin" },
]

export default function MultiSelectBasic() {
  return (
    <Field>
      {/* MultiSelect no longer takes an `id` to pair with a `<label htmlFor>` —
          it's `aria-labelledby` on the chips input instead. */}
      <FieldLabel id="ms-scopes-label">Token scopes</FieldLabel>
      <MultiSelect
        aria-labelledby="ms-scopes-label"
        options={SCOPES}
        defaultValue={["read", "write"]}
        placeholder="Select scopes…"
      />
    </Field>
  )
}
