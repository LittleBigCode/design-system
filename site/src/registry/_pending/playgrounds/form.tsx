import type { ComponentProps } from "react"

import { Button } from "@diametral/ui/components/button"
import { Field, FieldGroup, FieldLabel } from "@diametral/ui/components/field"
import { Form } from "@diametral/ui/components/form"
import { Input } from "@diametral/ui/components/input"

export default function FormPlayground(props: ComponentProps<typeof Form>) {
  return (
    <Form className="w-full max-w-sm" {...props}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="pg-form-email">Email</FieldLabel>
          <Input
            id="pg-form-email"
            name="email"
            type="email"
            required
            placeholder="you@diametral.com"
          />
        </Field>
      </FieldGroup>
      <Button type="submit" className="self-start">
        Send
      </Button>
    </Form>
  )
}
