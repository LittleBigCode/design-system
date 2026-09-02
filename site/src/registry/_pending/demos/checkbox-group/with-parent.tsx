import { Checkbox } from "@diametral/ui/components/checkbox"
import { CheckboxGroup } from "@diametral/ui/components/checkbox-group"
import { Field, FieldLabel } from "@diametral/ui/components/field"

const SCOPES = ["read:tokens", "write:tokens", "publish"]

export default function CheckboxGroupWithParent() {
  return (
    <CheckboxGroup
      allValues={SCOPES}
      defaultValue={["read:tokens"]}
      className="max-w-sm"
    >
      <Field orientation="horizontal">
        <Checkbox aria-labelledby="checkbox-parent-label" parent />
        <FieldLabel id="checkbox-parent-label">All scopes</FieldLabel>
      </Field>
      <div className="ms-6 flex flex-col gap-3">
        {SCOPES.map((scope) => (
          <Field key={scope} orientation="horizontal">
            <Checkbox
              aria-labelledby={`checkbox-${scope}-label`}
              value={scope}
            />
            <FieldLabel id={`checkbox-${scope}-label`}>{scope}</FieldLabel>
          </Field>
        ))}
      </div>
    </CheckboxGroup>
  )
}
