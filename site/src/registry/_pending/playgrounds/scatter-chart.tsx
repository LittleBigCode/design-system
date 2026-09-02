import type { ComponentProps } from "react"

import type { ChartConfig } from "@diametral/ui/components/chart"
import { ScatterChart } from "@diametral/ui/components/scatter-chart"

const DATA = [
  { tier: "free", price: 0, rating: 3.9, installs: 240 },
  { tier: "free", price: 0, rating: 4.2, installs: 410 },
  { tier: "paid", price: 12, rating: 4.4, installs: 96 },
  { tier: "paid", price: 24, rating: 4.6, installs: 61 },
  { tier: "paid", price: 39, rating: 4.1, installs: 34 },
  { tier: "paid", price: 58, rating: 4.8, installs: 22 },
]

const CONFIG = {
  free: { label: "Free" },
  paid: { label: "Paid" },
} satisfies ChartConfig

export default function ScatterChartPlayground(
  props: Partial<ComponentProps<typeof ScatterChart>>
) {
  return (
    <ScatterChart
      config={CONFIG}
      data={DATA}
      groupKey="tier"
      xKey="price"
      yKey="rating"
      xLabel="Price (€)"
      yLabel="Rating"
      {...props}
    />
  )
}
