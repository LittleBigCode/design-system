import { Field, FieldError, FieldLabel } from "@diametral/ui/components/field"
import { Input } from "@diametral/ui/components/input"

export default function InputInvalid() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Field>
        <FieldLabel htmlFor="input-invalid-email">Email</FieldLabel>
        <Input
          id="input-invalid-email"
          type="email"
          defaultValue="not-an-email"
          aria-invalid
        />
        <FieldError>Enter a valid email address.</FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor="input-invalid-locked">Workspace</FieldLabel>
        <Input id="input-invalid-locked" defaultValue="diametral" disabled />
      </Field>
    </div>
  )
}
