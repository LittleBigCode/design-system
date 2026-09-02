import { Checkbox } from "@diametral/ui/components/checkbox"
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@diametral/ui/components/field"
import { Input } from "@diametral/ui/components/input"

export default function FieldFieldset() {
  return (
    <FieldSet className="w-full max-w-sm">
      <FieldLegend>Billing</FieldLegend>
      <FieldDescription>Printed on every invoice.</FieldDescription>
      <Field>
        <FieldLabel htmlFor="field-fieldset-company">Company</FieldLabel>
        <Input id="field-fieldset-company" defaultValue="Diametral SAS" />
      </Field>
      <Field>
        <FieldLabel htmlFor="field-fieldset-vat">VAT number</FieldLabel>
        <Input id="field-fieldset-vat" defaultValue="FR40303265045" />
      </Field>
      <FieldSeparator />
      <Field orientation="horizontal">
        <Checkbox id="field-fieldset-postal" defaultChecked />
        <FieldLabel htmlFor="field-fieldset-postal">
          Reuse the postal address
        </FieldLabel>
      </Field>
    </FieldSet>
  )
}
