import type { ComponentProps } from "react"
import {
  Checkbox,
  CheckboxGroup,
  Field,
  FieldLabel,
} from "@diametral/design-system/react"

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
