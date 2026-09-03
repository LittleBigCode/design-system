import { PieChart, type ChartConfig } from "@diametral/design-system/react"

const DATA = [
  { tier: "enterprise", mrr: 41200 },
  { tier: "team", mrr: 18600 },
  { tier: "solo", mrr: 7400 },
]

const CONFIG = {
  enterprise: { label: "Enterprise", color: "var(--ds-chart-5)" },
  team: { label: "Team", color: "var(--ds-chart-2)" },
  solo: { label: "Solo", color: "var(--ds-chart-6)" },
} satisfies ChartConfig

export default function PieChartBranded() {
  return <PieChart config={CONFIG} data={DATA} valueKey="mrr" nameKey="tier" />
}
