import { AreaChart } from "@diametral/ui/components/area-chart"
import type { ChartConfig } from "@diametral/ui/components/chart"

const DATA = [
  { week: "W1", compute: 820, storage: 310, egress: 140 },
  { week: "W2", compute: 910, storage: 325, egress: 180 },
  { week: "W3", compute: 880, storage: 340, egress: 165 },
  { week: "W4", compute: 1120, storage: 352, egress: 220 },
  { week: "W5", compute: 1040, storage: 361, egress: 205 },
  { week: "W6", compute: 1310, storage: 374, egress: 260 },
]

const CONFIG = {
  compute: { label: "Compute" },
  storage: { label: "Storage" },
  egress: { label: "Egress" },
} satisfies ChartConfig

export default function AreaChartStacked() {
  return <AreaChart config={CONFIG} data={DATA} xAxisKey="week" stacked />
}
