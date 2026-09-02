import type { ComponentProps } from "react"

import { BarChart } from "@diametral/ui/components/bar-chart"
import type { ChartConfig } from "@diametral/ui/components/chart"

const DATA = [
  { quarter: "Q1", revenue: 182, cost: 121 },
  { quarter: "Q2", revenue: 214, cost: 138 },
  { quarter: "Q3", revenue: 198, cost: 144 },
  { quarter: "Q4", revenue: 263, cost: 151 },
]

const CONFIG = {
  revenue: { label: "Revenue (k€)" },
  cost: { label: "Cost (k€)" },
} satisfies ChartConfig

export default function BarChartPlayground(
  props: Partial<ComponentProps<typeof BarChart>>
) {
  return <BarChart config={CONFIG} data={DATA} xAxisKey="quarter" {...props} />
}
