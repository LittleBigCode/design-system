import { BarChart } from "@diametral/ui/components/bar-chart"
import type { ChartConfig } from "@diametral/ui/components/chart"

const DATA = [
  { service: "auth", uptime: 99.98, status: "success" },
  { service: "billing", uptime: 99.91, status: "success" },
  { service: "search", uptime: 99.42, status: "warning" },
  { service: "webhooks", uptime: 98.1, status: "danger" },
  { service: "reports", uptime: 99.87, status: "success" },
]

const CONFIG = {
  uptime: { label: "Uptime %" },
} satisfies ChartConfig

export default function BarChartStatus() {
  return (
    <BarChart
      config={CONFIG}
      data={DATA}
      xAxisKey="service"
      statusKey="status"
      max={100}
    />
  )
}
