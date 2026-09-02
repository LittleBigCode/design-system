import type { ChartConfig } from "@diametral/ui/components/chart"
import { StackedBar } from "@diametral/ui/components/stacked-bar"

const DATA = [
  { team: "Platform", shipped: 18, review: 6, blocked: 3 },
  { team: "Brand", shipped: 11, review: 9, blocked: 1 },
  { team: "Data", shipped: 14, review: 4, blocked: 6 },
  { team: "Growth", shipped: 22, review: 3, blocked: 2 },
]

const CONFIG = {
  shipped: { label: "Shipped", color: "var(--ds-chart-3)" },
  review: { label: "In review", color: "var(--ds-chart-6)" },
  blocked: { label: "Blocked", color: "var(--ds-chart-1)" },
} satisfies ChartConfig

export default function StackedBarByTeam() {
  return <StackedBar config={CONFIG} data={DATA} labelKey="team" />
}
