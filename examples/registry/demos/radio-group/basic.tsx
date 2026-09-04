import { RadioGroup } from "@diametral/design-system/react"

const PLANS = [
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "manual", label: "Manual only", disabled: true },
]

export default function RadioGroupBasic() {
  // `name` is deliberately left off: RadioGroup defaults it to a generated id,
  // which is what makes the radios one group and the native arrow keys work.
  return <RadioGroup options={PLANS} defaultValue="daily" />
}
