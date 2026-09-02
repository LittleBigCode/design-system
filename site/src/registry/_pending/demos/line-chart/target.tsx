import { ReferenceLine } from "recharts"

import { LineChart } from "@diametral/ui/components/line-chart"
import type { ChartConfig } from "@diametral/ui/components/chart"

const DATA = [
  { day: "Mon", uptime: 99.98 },
  { day: "Tue", uptime: 99.91 },
  { day: "Wed", uptime: 99.72 },
  { day: "Thu", uptime: 99.94 },
  { day: "Fri", uptime: 99.99 },
  { day: "Sat", uptime: 99.86 },
  { day: "Sun", uptime: 99.96 },
]

const CONFIG = {
  uptime: { label: "Uptime %", color: "var(--ds-chart-3)" },
} satisfies ChartConfig

export default function LineChartTarget() {
  return (
    <LineChart config={CONFIG} data={DATA} xAxisKey="day">
      <ReferenceLine
        y={99.9}
        strokeDasharray="4 4"
        stroke="var(--ds-chart-1)"
        label={{ value: "SLA 99.9%", position: "insideTopRight", fontSize: 11 }}
      />
    </LineChart>
  )
}
