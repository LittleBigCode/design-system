import type { ComponentProps } from "react"
import { RadarChart, type ChartConfig } from "@diametral/design-system/react"

const DATA = [
  { axis: "Speed", current: 78, target: 90 },
  { axis: "Reliability", current: 91, target: 95 },
  { axis: "Coverage", current: 62, target: 80 },
  { axis: "Cost", current: 70, target: 60 },
  { axis: "Support", current: 84, target: 85 },
]

const CONFIG = {
  current: { label: "Current" },
  target: { label: "Target" },
} satisfies ChartConfig

export default function RadarChartPlayground(
  props: Partial<ComponentProps<typeof RadarChart>>
) {
  return (
    <RadarChart
      config={CONFIG}
      data={DATA}
      dimensionKey="axis"
      domain={[0, 100]}
      {...props}
    />
  )
}
