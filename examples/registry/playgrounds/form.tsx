import { Button, Form, FormField, Input } from "@diametral/design-system/react"
import type { ComponentProps } from "react"

export default function FormPlayground(props: ComponentProps<typeof Form>) {
  return (
    <Form className="w-full max-w-sm" {...props}>
      <FormField label="Email" htmlFor="pg-form-email">
        <Input
          id="pg-form-email"
          name="email"
          type="email"
          required
          placeholder="you@diametral.com"
        />
      </FormField>
      <Button type="submit" className="self-start">
        Send
      </Button>
    </Form>
  )
}
