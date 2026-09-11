import {
  Button,
  Field,
  FieldDescription,
  FieldLabel,
  Form,
  Input,
  Textarea,
} from "@diametral/design-system/react"
export default function FormSections() {
  return (
    <Form className="max-w-sm" onSubmit={(event) => event.preventDefault()}>
      <fieldset>
        <legend>Company</legend>
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
          <Input id="form-s-siret" name="siret" defaultValue="81234567800019" />
          <FieldDescription>Fourteen digits, no spaces.</FieldDescription>
        </Field>
      </fieldset>

      <fieldset>
        <legend>Billing contact</legend>
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
      </fieldset>

      <div className="flex justify-end gap-2">
        <Button type="reset">Cancel</Button>
        <Button type="submit">Create supplier</Button>
      </div>
    </Form>
  )
}
