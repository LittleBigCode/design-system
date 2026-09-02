import { BarChart } from "@diametral/ui/components/bar-chart"
import type { ChartConfig } from "@diametral/ui/components/chart"

const DATA = [
  { channel: "Organic search", sessions: 18420 },
  { channel: "Direct", sessions: 11250 },
  { channel: "Referral", sessions: 6840 },
  { channel: "Paid social", sessions: 4120 },
  { channel: "Newsletter", sessions: 2380 },
]

const CONFIG = {
  sessions: { label: "Sessions", color: "var(--ds-chart-5)" },
} satisfies ChartConfig

export default function BarChartHorizontal() {
  return <BarChart config={CONFIG} data={DATA} xAxisKey="channel" horizontal />
}
