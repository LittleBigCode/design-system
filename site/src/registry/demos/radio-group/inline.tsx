import {
  Field,
  FieldLabel,
  RadioGroup,
  RadioGroupItem,
} from "@diametral/design-system/react"

const RANGES = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
]

export default function RadioGroupInline() {
  return (
    <RadioGroup
      defaultValue="30d"
      aria-label="Date range"
      className="w-auto grid-flow-col gap-6"
    >
      {RANGES.map((range) => (
        <Field key={range.value} orientation="horizontal" className="w-auto">
          <RadioGroupItem
            id={`radio-inline-${range.value}`}
            value={range.value}
          />
          <FieldLabel htmlFor={`radio-inline-${range.value}`}>
            {range.label}
          </FieldLabel>
        </Field>
      ))}
    </RadioGroup>
  )
}
