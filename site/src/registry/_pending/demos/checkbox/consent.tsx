import { Checkbox } from "@diametral/ui/components/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"

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
