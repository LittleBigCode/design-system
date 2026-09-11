import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
  RadioGroup,
  RadioGroupItem,
} from "@diametral/design-system/react"

const PLANS = [
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "manual", label: "Manual only", disabled: true },
]

export default function RadioGroupBasic() {
  // `name` is deliberately left off: RadioGroup defaults it to a generated id,
  // which is what makes the radios one group and the native arrow keys work.
  return (
    <FieldSet className="max-w-sm">
      <FieldLegend>Billing cadence</FieldLegend>
      <RadioGroup defaultValue="daily">
        {PLANS.map((plan) => (
          <Field key={plan.value} orientation="horizontal">
            <RadioGroupItem
              id={`radio-${plan.value}`}
              value={plan.value}
              disabled={plan.disabled}
            />
            <FieldLabel htmlFor={`radio-${plan.value}`}>
              {plan.label}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  )
}
