import type { ChartConfig } from "@diametral/ui/components/chart"
import {
  ComboChart,
  type ComboSeries,
} from "@diametral/ui/components/combo-chart"

const DATA = [
  { day: "Mon", tickets: 84, resolution: 5400000 },
  { day: "Tue", tickets: 97, resolution: 6120000 },
  { day: "Wed", tickets: 112, resolution: 7980000 },
  { day: "Thu", tickets: 91, resolution: 5040000 },
  { day: "Fri", tickets: 78, resolution: 4320000 },
]

const CONFIG = {
  tickets: { label: "Tickets opened", color: "var(--ds-chart-6)" },
  resolution: { label: "Median resolution", color: "var(--ds-chart-1)" },
} satisfies ChartConfig

const SERIES = [
  { key: "tickets", type: "bar" },
  { key: "resolution", type: "line", axis: "right" },
] satisfies ComboSeries[]

export default function ComboChartFormattedAxis() {
  return (
    <ComboChart
      config={CONFIG}
      data={DATA}
      xAxisKey="day"
      series={SERIES}
      rightAxis={{
        tickFormatter: (value) => `${Math.round(value / 3600000)}h`,
      }}
    />
  )
}
