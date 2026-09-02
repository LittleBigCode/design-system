import { LineChart } from "@diametral/ui/components/line-chart"
import type { ChartConfig } from "@diametral/ui/components/chart"

const LATENCY = [
  128, 134, 131, 152, 149, 143, 138, 141, 156, 168, 174, 161, 155, 149, 147,
  152, 163, 181, 195, 187, 172, 164, 158, 151,
]

const DATA = LATENCY.map((p95, hour) => ({
  hour: `${String(hour).padStart(2, "0")}:00`,
  p95,
}))

const CONFIG = {
  p95: { label: "p95 latency (ms)", color: "var(--ds-chart-2)" },
} satisfies ChartConfig

export default function LineChartDense() {
  return (
    <LineChart
      config={CONFIG}
      data={DATA}
      xAxisKey="hour"
      dots={false}
      grid={false}
    />
  )
}
