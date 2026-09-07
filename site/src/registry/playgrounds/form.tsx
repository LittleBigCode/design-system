import {
  Button,
  Field,
  FieldLabel,
  Form,
  Input,
} from "@diametral/design-system/react"
import type { ComponentProps } from "react"

export default function FormPlayground(props: ComponentProps<typeof Form>) {
  return (
    <Form className="w-full max-w-sm" {...props}>
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
      <Button type="submit" className="self-start">
        Send
      </Button>
    </Form>
  )
}
