import { WaterfallChart } from "@diametral/design-system/react"

const DATA = [
  { source: "Organic", signups: 1240 },
  { source: "Referral", signups: 610 },
  { source: "Paid search", signups: 480 },
  { source: "Partners", signups: 320 },
  { source: "Events", signups: 150 },
]

export default function WaterfallChartAccumulation() {
  return (
    <WaterfallChart
      data={DATA}
      nameKey="source"
      valueKey="signups"
      connectors={false}
      className="w-full max-w-xl"
    />
  )
}
