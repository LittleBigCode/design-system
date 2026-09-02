import type { ChartConfig } from "@diametral/ui/components/chart"
import {
  ComboChart,
  type ComboSeries,
} from "@diametral/ui/components/combo-chart"

const DATA = [
  { month: "Jan", revenue: 182000, margin: 31 },
  { month: "Feb", revenue: 196000, margin: 33 },
  { month: "Mar", revenue: 174000, margin: 28 },
  { month: "Apr", revenue: 221000, margin: 35 },
  { month: "May", revenue: 238000, margin: 37 },
  { month: "Jun", revenue: 229000, margin: 34 },
]

const CONFIG = {
  revenue: { label: "Revenue (€)", color: "var(--ds-chart-2)" },
  margin: { label: "Gross margin", color: "var(--ds-chart-1)" },
} satisfies ChartConfig

const SERIES = [
  { key: "revenue", type: "bar" },
  { key: "margin", type: "line", axis: "right" },
] satisfies ComboSeries[]

export default function ComboChartRevenueMargin() {
  return (
    <ComboChart
      config={CONFIG}
      data={DATA}
      xAxisKey="month"
      series={SERIES}
      rightAxis={{ domain: [0, 50], tickFormatter: (value) => `${value}%` }}
    />
  )
}
