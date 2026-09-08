import {
  Button,
  ColorPicker,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
} from "@diametral/design-system/react"

export default function ColorPickerInAForm() {
  return (
    <form className="flex w-full max-w-sm flex-col gap-4">
      <Field>
        <FieldLabel htmlFor="color-picker-form-label">Tag name</FieldLabel>
        <Input id="color-picker-form-label" defaultValue="Urgent" />
      </Field>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold tracking-wider uppercase">
          Tag colour
        </span>
        <ColorPicker
          name="tagColour"
          aria-label="Tag colour"
          defaultValue="#ff2a00"
        />
        <FieldDescription>
          Posted as tagColour. The hidden input only ever holds a parsed hex, so
          a half-typed value never reaches the server.
        </FieldDescription>
      </div>
      <Button size="sm" type="submit" className="self-start">
        Create tag
      </Button>
    </form>
  )
}
