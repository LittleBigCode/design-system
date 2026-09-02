import type { ChartConfig } from "@diametral/ui/components/chart"
import { DonutChart } from "@diametral/ui/components/donut-chart"

const DATA = [
  { category: "compute", spend: 4820 },
  { category: "storage", spend: 1340 },
  { category: "egress", spend: 910 },
  { category: "support", spend: 640 },
  { category: "other", spend: 210 },
]

const CONFIG = {
  compute: { label: "Compute" },
  storage: { label: "Storage" },
  egress: { label: "Egress" },
  support: { label: "Support" },
  other: { label: "Other" },
} satisfies ChartConfig

export default function DonutChartBreakdown() {
  return (
    <DonutChart
      config={CONFIG}
      data={DATA}
      valueKey="spend"
      nameKey="category"
    />
  )
}
