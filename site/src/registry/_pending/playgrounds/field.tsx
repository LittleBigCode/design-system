import type { ComponentProps } from "react"

import { Checkbox } from "@diametral/ui/components/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@diametral/ui/components/field"
import { Input } from "@diametral/ui/components/input"

// The template renders every Field part: the Workbench's code strip doubles as
// the anatomy navigator, so a part missing here would not be selectable. Only
// the first row takes the props — it is the row whose orientation you are
// changing.
export default function FieldPlayground({
  children,
  legend = "Release notifications",
  title = "Private previews",
  error = "Enter a valid email address.",
  ...props
}: ComponentProps<typeof Field> & {
  legend?: string
  title?: string
  error?: string
}) {
  return (
    <FieldSet className="w-full max-w-sm">
      <FieldLegend>{legend}</FieldLegend>
      <FieldDescription>
        Choose how changelog updates reach your inbox.
      </FieldDescription>
      <FieldGroup>
        <Field {...props}>
          <Checkbox id="pg-field-digest" defaultChecked />
          <FieldLabel htmlFor="pg-field-digest">{children}</FieldLabel>
        </Field>
        <Field data-invalid>
          <FieldLabel htmlFor="pg-field-reply">Reply-to address</FieldLabel>
          <Input
            id="pg-field-reply"
            type="email"
            defaultValue="hello@"
            aria-invalid
          />
          <FieldError>{error}</FieldError>
        </Field>
        <FieldSeparator />
        <FieldLabel htmlFor="pg-field-previews">
          <Field orientation="horizontal">
            <Checkbox id="pg-field-previews" />
            <FieldContent>
              <FieldTitle>{title}</FieldTitle>
              <FieldDescription>
                Notes for components that have not shipped yet.
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
      </FieldGroup>
    </FieldSet>
  )
}
