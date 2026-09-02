import { Field, FieldError, FieldLabel } from "@diametral/ui/components/field"
import { Input } from "@diametral/ui/components/input"

export default function FieldInvalid() {
  return (
    <form
      className="w-full max-w-sm"
      onSubmit={(event) => event.preventDefault()}
    >
      <Field>
        <FieldLabel htmlFor="field-invalid-password">Password</FieldLabel>
        <Input
          id="field-invalid-password"
          name="password"
          type="password"
          defaultValue="abc"
          aria-invalid
        />
        <FieldError
          errors={[
            { message: "Must be at least 12 characters." },
            { message: "Must contain a number." },
          ]}
        />
      </Field>
    </form>
  )
}
