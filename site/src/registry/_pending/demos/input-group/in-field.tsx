import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@diametral/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@diametral/ui/components/input-group"

export default function InputGroupInField() {
  return (
    <form
      className="flex w-full max-w-sm flex-col gap-8"
      onSubmit={(event) => event.preventDefault()}
    >
      <Field>
        <FieldLabel htmlFor="input-group-field-handle">Handle</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>@</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            id="input-group-field-handle"
            defaultValue="amorval"
          />
        </InputGroup>
        <FieldDescription>Used to mention you in reviews.</FieldDescription>
      </Field>

      <Field>
        <FieldLabel htmlFor="input-group-field-slug">Workspace URL</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>diametral.com/</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            id="input-group-field-slug"
            defaultValue="Design System"
            aria-invalid
          />
        </InputGroup>
        <FieldError>Lowercase letters, numbers and dashes only.</FieldError>
      </Field>
    </form>
  )
}
