import type { ChartConfig } from "@diametral/ui/components/chart"
import { PieChart } from "@diametral/ui/components/pie-chart"

const DATA = [
  { channel: "organic", sessions: 18420 },
  { channel: "direct", sessions: 11250 },
  { channel: "referral", sessions: 6840 },
  { channel: "social", sessions: 4120 },
]

const CONFIG = {
  organic: { label: "Organic search" },
  direct: { label: "Direct" },
  referral: { label: "Referral" },
  social: { label: "Paid social" },
} satisfies ChartConfig

export default function PieChartBasic() {
  return (
    <PieChart
      config={CONFIG}
      data={DATA}
      valueKey="sessions"
      nameKey="channel"
    />
  )
}
