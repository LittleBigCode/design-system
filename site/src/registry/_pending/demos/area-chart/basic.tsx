import { AreaChart } from "@diametral/ui/components/area-chart"
import type { ChartConfig } from "@diametral/ui/components/chart"

const DATA = [
  { month: "Jan", visitors: 1200 },
  { month: "Feb", visitors: 1800 },
  { month: "Mar", visitors: 1500 },
  { month: "Apr", visitors: 2400 },
  { month: "May", visitors: 2100 },
  { month: "Jun", visitors: 2900 },
]

const CONFIG = {
  visitors: { label: "Visitors", color: "var(--ds-chart-2)" },
} satisfies ChartConfig

export default function AreaChartBasic() {
  return <AreaChart config={CONFIG} data={DATA} xAxisKey="month" />
}
