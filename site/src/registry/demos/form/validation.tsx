import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Form,
  Input,
} from "@diametral/design-system/react"
import * as React from "react"

type Errors = { email?: string; siret?: string }

export default function FormValidation() {
  const [errors, setErrors] = React.useState<Errors>({})

  return (
    <Form
      className="max-w-sm"
      onSubmit={(event) => {
        event.preventDefault()
        const values = new FormData(event.currentTarget)
        const email = String(values.get("email") ?? "")
        const siret = String(values.get("siret") ?? "")
        setErrors({
          email: email.includes("@")
            ? undefined
            : "Enter a valid email address.",
          siret: /^\d{14}$/.test(siret) ? undefined : "A SIRET is 14 digits.",
        })
      }}
    >
      <Field data-invalid={errors.email ? true : undefined}>
        <FieldLabel htmlFor="form-v-email">Email</FieldLabel>
        <Input
          id="form-v-email"
          name="email"
          defaultValue="camille"
          aria-invalid={errors.email ? true : undefined}
        />
        {errors.email && <FieldError>{errors.email}</FieldError>}
      </Field>

      <Field data-invalid={errors.siret ? true : undefined}>
        <FieldLabel htmlFor="form-v-siret">SIRET</FieldLabel>
        <Input
          id="form-v-siret"
          name="siret"
          defaultValue="123"
          aria-invalid={errors.siret ? true : undefined}
        />
        {errors.siret && <FieldError>{errors.siret}</FieldError>}
      </Field>

      <Button type="submit" className="self-start">
        Validate
      </Button>
    </Form>
  )
}
