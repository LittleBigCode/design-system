import { Button } from "@diametral/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@diametral/ui/components/field"
import { Form } from "@diametral/ui/components/form"
import { Input } from "@diametral/ui/components/input"
import { Textarea } from "@diametral/ui/components/textarea"

export default function FormSections() {
  return (
    <Form className="max-w-sm" onSubmit={(event) => event.preventDefault()}>
      <FieldSet>
        <FieldLegend>Company</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="form-s-name">Legal name</FieldLabel>
            <Input
              id="form-s-name"
              name="legal-name"
              defaultValue="Atelier Nord SAS"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="form-s-siret">SIRET</FieldLabel>
            <Input
              id="form-s-siret"
              name="siret"
              defaultValue="81234567800019"
            />
            <FieldDescription>Fourteen digits, no spaces.</FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>

      <FieldSet>
        <FieldLegend>Billing contact</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="form-s-email">Email</FieldLabel>
            <Input
              id="form-s-email"
              name="email"
              type="email"
              defaultValue="compta@atelier-nord.fr"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="form-s-notes">Notes</FieldLabel>
            <Textarea
              id="form-s-notes"
              name="notes"
              rows={2}
              placeholder="Purchase order reference, payment terms…"
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      <div className="flex justify-end gap-2">
        <Button type="reset" variant="ghost">
          Cancel
        </Button>
        <Button type="submit">Create supplier</Button>
      </div>
    </Form>
  )
}
