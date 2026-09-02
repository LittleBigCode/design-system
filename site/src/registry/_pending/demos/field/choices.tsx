import { Checkbox } from "@diametral/ui/components/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@diametral/ui/components/field"
import { Switch } from "@diametral/ui/components/switch"

export default function FieldChoices() {
  return (
    <div className="w-full max-w-sm">
      <FieldGroup>
        <Field orientation="horizontal">
          <Checkbox id="field-choices-terms" defaultChecked />
          <FieldLabel htmlFor="field-choices-terms">
            Accept the charter
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Switch id="field-choices-notify" />
          <FieldContent>
            <FieldLabel htmlFor="field-choices-notify">
              Email notifications
            </FieldLabel>
            <FieldDescription>Sent once per deploy.</FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </div>
  )
}
