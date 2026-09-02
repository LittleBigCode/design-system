import type { ChartConfig } from "@diametral/ui/components/chart"
import { DonutChart } from "@diametral/ui/components/donut-chart"

const DATA = [
  { bucket: "used", gb: 6.2 },
  { bucket: "free", gb: 3.8 },
]

const CONFIG = {
  used: { label: "Used", color: "var(--ds-chart-1)" },
  free: { label: "Free", color: "var(--ds-grey-bg)" },
} satisfies ChartConfig

export default function DonutChartThin() {
  return (
    <DonutChart
      config={CONFIG}
      data={DATA}
      valueKey="gb"
      nameKey="bucket"
      thickness={12}
      centerLabel="62%"
      centerCaption="of 10 GB"
      legend={false}
      className="h-40"
    />
  )
}
