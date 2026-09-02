import { FunnelChart } from "@diametral/ui/components/funnel-chart"

const DATA = [
  { stage: "Trials started", accounts: 1260 },
  { stage: "Converted to paid", accounts: 214 },
]

export default function FunnelChartTwoStage() {
  return (
    <FunnelChart
      data={DATA}
      nameKey="stage"
      valueKey="accounts"
      className="h-40 w-full max-w-xl"
    />
  )
}
