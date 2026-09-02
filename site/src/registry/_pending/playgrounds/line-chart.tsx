import type { ComponentProps } from "react"

import type { ChartConfig } from "@diametral/ui/components/chart"
import { LineChart } from "@diametral/ui/components/line-chart"

const DATA = [
  { week: "W1", deploys: 4 },
  { week: "W2", deploys: 7 },
  { week: "W3", deploys: 5 },
  { week: "W4", deploys: 11 },
  { week: "W5", deploys: 9 },
  { week: "W6", deploys: 14 },
]

const CONFIG = {
  deploys: { label: "Deploys" },
} satisfies ChartConfig

export default function LineChartPlayground(
  props: Partial<ComponentProps<typeof LineChart>>
) {
  return <LineChart config={CONFIG} data={DATA} xAxisKey="week" {...props} />
}
