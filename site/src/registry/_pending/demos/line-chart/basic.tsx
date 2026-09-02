import type { ChartConfig } from "@diametral/ui/components/chart"
import { LineChart } from "@diametral/ui/components/line-chart"

const DATA = [
  { month: "Jan", mrr: 41200 },
  { month: "Feb", mrr: 43800 },
  { month: "Mar", mrr: 43100 },
  { month: "Apr", mrr: 47600 },
  { month: "May", mrr: 51900 },
  { month: "Jun", mrr: 55400 },
  { month: "Jul", mrr: 54800 },
  { month: "Aug", mrr: 59300 },
]

const CONFIG = {
  mrr: { label: "MRR (€)" },
} satisfies ChartConfig

export default function LineChartBasic() {
  return <LineChart config={CONFIG} data={DATA} xAxisKey="month" />
}
