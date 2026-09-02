import { Combobox } from "@diametral/design-system/react"

const REGIONS = [
  { value: "eu-west-1", label: "Europe (Ireland)" },
  { value: "eu-west-3", label: "Europe (Paris)" },
  { value: "eu-central-1", label: "Europe (Frankfurt)" },
  { value: "us-east-1", label: "US East (N. Virginia)" },
  { value: "ap-northeast-1", label: "Asia Pacific (Tokyo)" },
]

export default function ComboboxBasic() {
  return (
    <Combobox
      options={REGIONS}
      defaultValue="eu-west-3"
      placeholder="Search regions…"
    />
  )
}
