import * as React from "react"

import { Button } from "@diametral/ui/components/button"
import { Checkbox } from "@diametral/ui/components/checkbox"
import { CheckboxGroup } from "@diametral/ui/components/checkbox-group"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@diametral/ui/components/field"

const ENVIRONMENTS = [
  { value: "preview", label: "Preview" },
  { value: "staging", label: "Staging" },
  { value: "production", label: "Production" },
]

export default function CheckboxGroupValidation() {
  const [selected, setSelected] = React.useState<string[]>([])
  const [submitted, setSubmitted] = React.useState(false)
  const invalid = submitted && selected.length === 0

  return (
    <form
      className="w-full max-w-sm"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
    >
      <FieldSet>
        <FieldLegend>Deploy to</FieldLegend>
        <FieldDescription>Pick at least one environment.</FieldDescription>
        <CheckboxGroup
          value={selected}
          onValueChange={(value) => {
            setSelected(value)
            setSubmitted(false)
          }}
        >
          {ENVIRONMENTS.map((environment) => (
            <Field key={environment.value} orientation="horizontal">
              <Checkbox
                id={`checkbox-validation-${environment.value}`}
                value={environment.value}
                aria-invalid={invalid || undefined}
              />
              <FieldLabel htmlFor={`checkbox-validation-${environment.value}`}>
                {environment.label}
              </FieldLabel>
            </Field>
          ))}
        </CheckboxGroup>
        <FieldError>
          {invalid ? "Select at least one environment." : null}
        </FieldError>
        <Button type="submit" size="sm" className="w-fit">
          Deploy
        </Button>
      </FieldSet>
    </form>
  )
}
