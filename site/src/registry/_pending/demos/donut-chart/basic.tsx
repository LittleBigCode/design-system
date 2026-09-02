import type { ChartConfig } from "@diametral/ui/components/chart"
import { DonutChart } from "@diametral/ui/components/donut-chart"

const DATA = [
  { tier: "enterprise", mrr: 41200 },
  { tier: "team", mrr: 18600 },
  { tier: "solo", mrr: 7400 },
]

const CONFIG = {
  enterprise: { label: "Enterprise" },
  team: { label: "Team" },
  solo: { label: "Solo" },
} satisfies ChartConfig

export default function DonutChartBasic() {
  return (
    <DonutChart
      config={CONFIG}
      data={DATA}
      valueKey="mrr"
      nameKey="tier"
      centerLabel="67 200"
      centerCaption="MRR"
    />
  )
}
