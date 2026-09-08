import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldLabel,
  MultiSelect,
} from "@diametral/design-system/react"

const SCOPES = [
  { value: "read:tokens", label: "read:tokens" },
  { value: "write:tokens", label: "write:tokens" },
  { value: "read:components", label: "read:components" },
  { value: "publish", label: "publish" },
]

export default function MultiSelectControlled() {
  const [value, setValue] = React.useState<string[]>(["read:tokens"])

  return (
    <Field className="max-w-sm">
      <FieldLabel id="multi-select-controlled-scopes-label">Scopes</FieldLabel>
      <MultiSelect
        options={SCOPES}
        value={value}
        onValueChange={setValue}
        aria-labelledby="multi-select-controlled-scopes-label"
      />
      <FieldDescription>{value.length} scope(s) selected.</FieldDescription>
    </Field>
  )
}
