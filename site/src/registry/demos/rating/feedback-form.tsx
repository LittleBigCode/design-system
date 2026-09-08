import * as React from "react"

import {
  Button,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Form,
  Rating,
  Textarea,
} from "@diametral/design-system/react"

export default function RatingFeedbackForm() {
  const [sent, setSent] = React.useState<string>()

  return (
    <Form
      className="max-w-sm"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        setSent(`${data.get("satisfaction")}/5 — ${data.get("comment")}`)
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel>How was the delivery?</FieldLabel>
          <Rating
            name="satisfaction"
            defaultValue={4}
            aria-label="Satisfaction"
          />
          <FieldDescription>
            Submitted with the form like any other radio group.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="rating-comment">Anything to add?</FieldLabel>
          <Textarea
            id="rating-comment"
            name="comment"
            rows={3}
            defaultValue="Livraison en avance, palette bien filmée."
          />
        </Field>
      </FieldGroup>

      <Button type="submit" className="self-start">
        Send feedback
      </Button>

      {sent && (
        <output className="text-sm text-muted-foreground">{sent}</output>
      )}
    </Form>
  )
}
