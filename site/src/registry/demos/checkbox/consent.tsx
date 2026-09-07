import {
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@diametral/design-system/react"
export default function CheckboxConsent() {
  return (
    <Field orientation="horizontal" className="max-w-sm">
      <Checkbox id="checkbox-consent-charter" name="charter" />
      <FieldContent>
        <FieldLabel htmlFor="checkbox-consent-charter">
          Accept the token charter
        </FieldLabel>
        <FieldDescription>
          Palette changes go through a contrast review before they ship.
        </FieldDescription>
      </FieldContent>
    </Field>
  )
}
