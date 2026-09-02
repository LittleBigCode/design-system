import type { ChartConfig } from "@diametral/ui/components/chart"
import {
  ComboChart,
  type ComboSeries,
} from "@diametral/ui/components/combo-chart"

const DATA = [
  { quarter: "Q1", booked: 148, delivered: 132 },
  { quarter: "Q2", booked: 176, delivered: 159 },
  { quarter: "Q3", booked: 162, delivered: 168 },
  { quarter: "Q4", booked: 205, delivered: 181 },
]

const CONFIG = {
  booked: { label: "Booked days", color: "var(--ds-chart-5)" },
  delivered: { label: "Delivered days", color: "var(--ds-chart-3)" },
} satisfies ChartConfig

const SERIES = [
  { key: "booked", type: "bar" },
  { key: "delivered", type: "line" },
] satisfies ComboSeries[]

export default function ComboChartSameScale() {
  return (
    <ComboChart
      config={CONFIG}
      data={DATA}
      xAxisKey="quarter"
      series={SERIES}
    />
  )
}
