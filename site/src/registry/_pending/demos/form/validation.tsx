import * as React from "react"

import { Button } from "@diametral/ui/components/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@diametral/ui/components/field"
import { Form } from "@diametral/ui/components/form"
import { Input } from "@diametral/ui/components/input"

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
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-v-email">Email</FieldLabel>
          <Input
            id="form-v-email"
            name="email"
            defaultValue="camille"
            aria-invalid={errors.email ? true : undefined}
          />
          <FieldError errors={[{ message: errors.email }]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="form-v-siret">SIRET</FieldLabel>
          <Input
            id="form-v-siret"
            name="siret"
            defaultValue="123"
            aria-invalid={errors.siret ? true : undefined}
          />
          <FieldError errors={[{ message: errors.siret }]} />
        </Field>
      </FieldGroup>

      <Button type="submit" className="self-start">
        Validate
      </Button>
    </Form>
  )
}
