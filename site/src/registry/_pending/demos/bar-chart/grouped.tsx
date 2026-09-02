import { BarChart } from "@diametral/ui/components/bar-chart"
import type { ChartConfig } from "@diametral/ui/components/chart"

const DATA = [
  { month: "Jan", planned: 40, shipped: 34 },
  { month: "Feb", planned: 38, shipped: 41 },
  { month: "Mar", planned: 45, shipped: 39 },
  { month: "Apr", planned: 42, shipped: 44 },
]

const CONFIG = {
  planned: { label: "Planned", color: "var(--ds-chart-4)" },
  shipped: { label: "Shipped", color: "var(--ds-chart-3)" },
} satisfies ChartConfig

export default function BarChartGrouped() {
  return <BarChart config={CONFIG} data={DATA} xAxisKey="month" />
}
