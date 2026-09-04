import {
  Button,
  FieldDescription,
  FormField,
  Input,
  PhoneInput,
} from "@diametral/design-system/react"
export default function PhoneInputContactForm() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <FormField label="Full name" htmlFor="phone-input-contact-name">
        <Input id="phone-input-contact-name" defaultValue="Léa Réveil" />
      </FormField>
      <FormField label="Email" htmlFor="phone-input-contact-email">
        <Input
          id="phone-input-contact-email"
          type="email"
          defaultValue="lreveil@diametral.com"
        />
      </FormField>
      <FormField label="Phone">
        <PhoneInput defaultValue="+32470123456" />
        <FieldDescription>Dial code included in the value.</FieldDescription>
      </FormField>
      <Button size="sm" className="self-start">
        Save contact
      </Button>
    </div>
  )
}
