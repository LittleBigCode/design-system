import {
  Field,
  FieldDescription,
  FieldLabel,
  Textarea,
} from "@diametral/design-system/react"
export default function FieldBasic() {
  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="field-basic-note">Release note</FieldLabel>
        <Textarea id="field-basic-note" placeholder="What changed?" rows={3} />
        <FieldDescription>Markdown is supported.</FieldDescription>
      </Field>
    </div>
  )
}
