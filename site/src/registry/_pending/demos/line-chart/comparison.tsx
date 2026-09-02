import { LineChart } from "@diametral/ui/components/line-chart"
import type { ChartConfig } from "@diametral/ui/components/chart"

const DATA = [
  { month: "Jan", opened: 42, closed: 31 },
  { month: "Feb", opened: 38, closed: 45 },
  { month: "Mar", opened: 55, closed: 40 },
  { month: "Apr", opened: 47, closed: 52 },
  { month: "May", opened: 61, closed: 58 },
  { month: "Jun", opened: 44, closed: 63 },
]

const CONFIG = {
  opened: { label: "Opened", color: "var(--ds-chart-1)" },
  closed: { label: "Closed", color: "var(--ds-chart-3)" },
} satisfies ChartConfig

export default function LineChartComparison() {
  return <LineChart config={CONFIG} data={DATA} xAxisKey="month" />
}
