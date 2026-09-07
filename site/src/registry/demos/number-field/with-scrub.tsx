import {
  Field,
  FieldDescription,
  FieldLabel,
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@diametral/design-system/react"

export default function NumberFieldWithScrub() {
  return (
    <Field className="max-w-xs">
      <NumberField defaultValue={0} step={0.05} min={-0.5} max={0.5}>
        <NumberFieldScrubArea>
          <FieldLabel id="number-field-scrub-letter-spacing-label">
            Letter spacing
          </FieldLabel>
        </NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldInput
            className="ps-0 text-start"
            aria-labelledby="number-field-scrub-letter-spacing-label"
          />
        </NumberFieldGroup>
      </NumberField>
      <FieldDescription>Drag the label left or right.</FieldDescription>
    </Field>
  )
}
