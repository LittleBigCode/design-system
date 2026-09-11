import {
  Button,
  Field,
  FieldDescription,
  FieldLabel,
  Form,
  Input,
  Textarea,
} from "@diametral/design-system/react"
import * as React from "react"

export default function FormBasic() {
  const [submitted, setSubmitted] = React.useState<string>()

  return (
    <Form
      className="max-w-sm"
      onSubmit={(event) => {
        event.preventDefault()
        const values = Object.fromEntries(new FormData(event.currentTarget))
        setSubmitted(JSON.stringify(values))
      }}
    >
      <Field>
        <FieldLabel htmlFor="form-name">Name</FieldLabel>
        <Input id="form-name" name="name" defaultValue="Camille Roux" />
      </Field>

      <Field>
        <FieldLabel htmlFor="form-brief">Brief</FieldLabel>
        <Textarea id="form-brief" name="brief" rows={3} />
        <FieldDescription>
          Submitting logs the collected values below.
        </FieldDescription>
      </Field>

      <Button type="submit" className="self-start">
        Send
      </Button>

      {submitted && (
        <output className="font-mono text-xs break-all text-muted-foreground">
          {submitted}
        </output>
      )}
    </Form>
  )
}
