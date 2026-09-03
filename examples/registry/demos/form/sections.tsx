import {
  Button,
  FieldDescription,
  Form,
  FormField,
  Input,
  Textarea,
} from "@diametral/design-system/react"
export default function FormSections() {
  return (
    <Form className="max-w-sm" onSubmit={(event) => event.preventDefault()}>
      <fieldset>
        <legend>Company</legend>
        <FormField label="Legal name" htmlFor="form-s-name">
          <Input
            id="form-s-name"
            name="legal-name"
            defaultValue="Atelier Nord SAS"
          />
        </FormField>
        <FormField label="SIRET" htmlFor="form-s-siret">
          <Input id="form-s-siret" name="siret" defaultValue="81234567800019" />
          <FieldDescription>Fourteen digits, no spaces.</FieldDescription>
        </FormField>
      </fieldset>

      <fieldset>
        <legend>Billing contact</legend>
        <FormField label="Email" htmlFor="form-s-email">
          <Input
            id="form-s-email"
            name="email"
            type="email"
            defaultValue="compta@atelier-nord.fr"
          />
        </FormField>
        <FormField label="Notes" htmlFor="form-s-notes">
          <Textarea
            id="form-s-notes"
            name="notes"
            rows={2}
            placeholder="Purchase order reference, payment terms…"
          />
        </FormField>
      </fieldset>

      <div className="flex justify-end gap-2">
        <Button type="reset">Cancel</Button>
        <Button type="submit">Create supplier</Button>
      </div>
    </Form>
  )
}
