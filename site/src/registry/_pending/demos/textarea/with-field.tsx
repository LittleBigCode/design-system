import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@diametral/ui/components/field"
import { Textarea } from "@diametral/ui/components/textarea"

export default function TextareaWithField() {
  return (
    <form
      className="flex w-full max-w-sm flex-col gap-8"
      onSubmit={(event) => event.preventDefault()}
    >
      <Field>
        <FieldLabel htmlFor="textarea-brief">Brief</FieldLabel>
        <Textarea id="textarea-brief" rows={3} />
        <FieldDescription>
          What the project must achieve, in two or three sentences.
        </FieldDescription>
      </Field>

      <Field>
        <FieldLabel htmlFor="textarea-notes">Notes</FieldLabel>
        <Textarea
          id="textarea-notes"
          rows={3}
          defaultValue="Too short"
          aria-invalid
        />
        <FieldError errors={[{ message: "Must be at least 20 characters." }]} />
      </Field>
    </form>
  )
}
