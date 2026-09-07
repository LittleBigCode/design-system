import { RadarChart, type ChartConfig } from "@diametral/design-system/react"

const DATA = [
  { capability: "Latency", atlas: 82 },
  { capability: "Throughput", atlas: 74 },
  { capability: "Durability", atlas: 91 },
  { capability: "Observability", atlas: 58 },
  { capability: "Cost", atlas: 66 },
]

const CONFIG = {
  atlas: { label: "Atlas" },
} satisfies ChartConfig

export default function RadarChartBasic() {
  return (
    <RadarChart
      config={CONFIG}
      data={DATA}
      dimensionKey="capability"
      domain={[0, 100]}
    />
  )
}
