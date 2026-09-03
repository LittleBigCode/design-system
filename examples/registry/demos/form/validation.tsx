import { Button, Form, FormField, Input } from "@diametral/design-system/react"
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
      <FormField error={errors.email} label="Email" htmlFor="form-v-email">
        <Input
          id="form-v-email"
          name="email"
          defaultValue="camille"
          aria-invalid={errors.email ? true : undefined}
        />
      </FormField>

      <FormField error={errors.siret} label="SIRET" htmlFor="form-v-siret">
        <Input
          id="form-v-siret"
          name="siret"
          defaultValue="123"
          aria-invalid={errors.siret ? true : undefined}
        />
      </FormField>

      <Button type="submit" className="self-start">
        Validate
      </Button>
    </Form>
  )
}
