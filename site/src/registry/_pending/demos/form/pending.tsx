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
import { Spinner } from "@diametral/ui/components/spinner"

const TAKEN = ["camille@diametral.fr"]

function submitToServer(email: string) {
  return new Promise<string | undefined>((resolve) => {
    setTimeout(
      () =>
        resolve(
          TAKEN.includes(email) ? "That email is already invited." : undefined
        ),
      800
    )
  })
}

export default function FormPending() {
  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState<string>()
  const [invited, setInvited] = React.useState<string>()

  return (
    <Form
      className="max-w-sm"
      onSubmit={async (event) => {
        event.preventDefault()
        const email = String(
          new FormData(event.currentTarget).get("email") ?? ""
        )
        setPending(true)
        setInvited(undefined)
        const message = await submitToServer(email)
        setError(message)
        setInvited(message ? undefined : email)
        setPending(false)
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-p-email">Invite a teammate</FieldLabel>
          <Input
            id="form-p-email"
            name="email"
            type="email"
            defaultValue="camille@diametral.fr"
            disabled={pending}
            aria-invalid={error ? true : undefined}
          />
          <FieldError errors={[{ message: error }]} />
        </Field>
      </FieldGroup>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending && <Spinner />}
          Send invite
        </Button>
        {invited && (
          <output className="text-sm text-muted-foreground">
            Invitation sent to {invited}.
          </output>
        )}
      </div>
    </Form>
  )
}
