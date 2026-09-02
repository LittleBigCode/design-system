import { AreaChart } from "@diametral/ui/components/area-chart"
import type { ChartConfig } from "@diametral/ui/components/chart"

const DATA = [
  { day: "Mon", forecast: 340, actual: 312 },
  { day: "Tue", forecast: 360, actual: 388 },
  { day: "Wed", forecast: 355, actual: 341 },
  { day: "Thu", forecast: 380, actual: 402 },
  { day: "Fri", forecast: 410, actual: 396 },
  { day: "Sat", forecast: 240, actual: 268 },
  { day: "Sun", forecast: 210, actual: 199 },
]

const CONFIG = {
  forecast: { label: "Forecast", color: "var(--ds-chart-4)" },
  actual: { label: "Actual", color: "var(--ds-chart-2)" },
} satisfies ChartConfig

export default function AreaChartOverlaid() {
  return <AreaChart config={CONFIG} data={DATA} xAxisKey="day" dots />
}
