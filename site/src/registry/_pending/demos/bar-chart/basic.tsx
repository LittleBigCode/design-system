import { BarChart } from "@diametral/ui/components/bar-chart"
import type { ChartConfig } from "@diametral/ui/components/chart"

const DATA = [
  { quarter: "Q1", revenue: 182 },
  { quarter: "Q2", revenue: 214 },
  { quarter: "Q3", revenue: 198 },
  { quarter: "Q4", revenue: 263 },
]

const CONFIG = {
  revenue: { label: "Revenue (k€)", color: "var(--ds-chart-2)" },
} satisfies ChartConfig

export default function BarChartBasic() {
  return <BarChart config={CONFIG} data={DATA} xAxisKey="quarter" max={300} />
}
