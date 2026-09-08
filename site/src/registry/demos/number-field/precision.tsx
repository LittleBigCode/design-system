import {
  Field,
  FieldDescription,
  FieldLabel,
  Kbd,
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@diametral/design-system/react"

export default function NumberFieldPrecision() {
  return (
    <Field className="max-w-xs">
      <FieldLabel id="number-field-precision-label">Line height</FieldLabel>
      <NumberField
        defaultValue={1.5}
        min={1}
        max={3}
        step={0.1}
        smallStep={0.01}
        largeStep={0.5}
        snapOnStep
        allowWheelScrub
        format={{ minimumFractionDigits: 2 }}
      >
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput aria-labelledby="number-field-precision-label" />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <FieldDescription>
        Arrow keys step by 0.1, <Kbd>Alt</Kbd> by 0.01 and <Kbd>Shift</Kbd> by
        0.5. The wheel scrubs while the field has focus.
      </FieldDescription>
    </Field>
  )
}
