import type { ComponentProps } from "react"

import { Checkbox } from "@diametral/ui/components/checkbox"
import { CheckboxGroup } from "@diametral/ui/components/checkbox-group"
import { Field, FieldLabel } from "@diametral/ui/components/field"

const TOPICS = ["releases", "charter", "incidents"]

export default function CheckboxGroupPlayground(
  props: ComponentProps<typeof CheckboxGroup>
) {
  return (
    <CheckboxGroup className="max-w-sm" defaultValue={["releases"]} {...props}>
      {TOPICS.map((topic) => (
        <Field key={topic} orientation="horizontal">
          <Checkbox id={`pg-cbg-${topic}`} value={topic} />
          <FieldLabel htmlFor={`pg-cbg-${topic}`}>{topic}</FieldLabel>
        </Field>
      ))}
    </CheckboxGroup>
  )
}
