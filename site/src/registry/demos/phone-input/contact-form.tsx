import {
  Button,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  PhoneInput,
} from "@diametral/design-system/react"
export default function PhoneInputContactForm() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Field>
        <FieldLabel htmlFor="phone-input-contact-name">Full name</FieldLabel>
        <Input id="phone-input-contact-name" defaultValue="Léa Réveil" />
      </Field>
      <Field>
        <FieldLabel htmlFor="phone-input-contact-email">Email</FieldLabel>
        <Input
          id="phone-input-contact-email"
          type="email"
          defaultValue="lreveil@diametral.com"
        />
      </Field>
      <Field>
        <FieldLabel>Phone</FieldLabel>
        <PhoneInput defaultValue="+32470123456" />
        <FieldDescription>Dial code included in the value.</FieldDescription>
      </Field>
      <Button size="sm" className="self-start">
        Save contact
      </Button>
    </div>
  )
}
