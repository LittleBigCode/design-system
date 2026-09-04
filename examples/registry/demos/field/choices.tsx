import {
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Switch,
} from "@diametral/design-system/react"
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
