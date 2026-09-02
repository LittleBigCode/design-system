import {
  Button,
  FieldHint,
  Form,
  FormField,
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
      <FormField label="Name" htmlFor="form-name">
        <Input id="form-name" name="name" defaultValue="Camille Roux" />
      </FormField>

      <FormField label="Brief" htmlFor="form-brief">
        <Textarea id="form-brief" name="brief" rows={3} />
        <FieldHint>Submitting logs the collected values below.</FieldHint>
      </FormField>

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
