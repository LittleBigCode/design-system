import {
  Field,
  FieldDescription,
  FieldLabel,
  TagsInput,
} from "@diametral/design-system/react"

export default function TagsInputMax() {
  return (
    <Field className="max-w-sm">
      <FieldLabel id="tags-input-max-recipients-label">
        Recipients (max 3)
      </FieldLabel>
      <TagsInput
        defaultValue={["alice@diametral.com", "bob@diametral.com"]}
        max={3}
        placeholder="Add an email…"
        aria-labelledby="tags-input-max-recipients-label"
      />
      <FieldDescription>No more than three recipients.</FieldDescription>
    </Field>
  )
}
