import { Checkbox } from "@diametral/ui/components/checkbox"
import { CheckboxGroup } from "@diametral/ui/components/checkbox-group"
import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@diametral/ui/components/field"

const TOPICS = [
  { value: "releases", label: "Release notes" },
  { value: "charter", label: "Charter changes" },
  { value: "incidents", label: "Incidents" },
]

export default function CheckboxGroupBasic() {
  return (
    <FieldSet className="max-w-sm">
      <FieldLegend>Notifications</FieldLegend>
      <CheckboxGroup defaultValue={["releases"]}>
        {TOPICS.map((topic) => (
          <Field key={topic.value} orientation="horizontal">
            <Checkbox
              id={`checkbox-group-${topic.value}`}
              value={topic.value}
            />
            <FieldLabel htmlFor={`checkbox-group-${topic.value}`}>
              {topic.label}
            </FieldLabel>
          </Field>
        ))}
      </CheckboxGroup>
    </FieldSet>
  )
}
