import { Segmented } from "@diametral/design-system/react"

const WINDOWS = [
  { value: "24h", label: "24 h" },
  { value: "7d", label: "7 d" },
  { value: "30d", label: "30 d", dot: "ok" as const },
  { value: "all", label: "All", dot: "ko" as const },
]

export default function ToggleGroupBasic() {
  return <Segmented items={WINDOWS} defaultValue="7d" />
}
