import type { ComponentProps } from "react"

import { AreaChart } from "@diametral/ui/components/area-chart"
import type { ChartConfig } from "@diametral/ui/components/chart"

const DATA = [
  { month: "Jan", visitors: 1200, signups: 240 },
  { month: "Feb", visitors: 1800, signups: 310 },
  { month: "Mar", visitors: 1500, signups: 288 },
  { month: "Apr", visitors: 2400, signups: 402 },
  { month: "May", visitors: 2100, signups: 375 },
  { month: "Jun", visitors: 2900, signups: 468 },
]

const CONFIG = {
  visitors: { label: "Visitors" },
  signups: { label: "Signups" },
} satisfies ChartConfig

export default function AreaChartPlayground(
  props: Partial<ComponentProps<typeof AreaChart>>
) {
  return <AreaChart config={CONFIG} data={DATA} xAxisKey="month" {...props} />
}
