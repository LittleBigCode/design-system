import type { ChartConfig } from "@diametral/ui/components/chart"
import { ScatterChart } from "@diametral/ui/components/scatter-chart"

const DATA = [
  { plan: "self-serve", seats: 3, arr: 1080 },
  { plan: "self-serve", seats: 5, arr: 1740 },
  { plan: "self-serve", seats: 8, arr: 2640 },
  { plan: "self-serve", seats: 12, arr: 4100 },
  { plan: "self-serve", seats: 6, arr: 2010 },
  { plan: "self-serve", seats: 9, arr: 3120 },
  { plan: "enterprise", seats: 48, arr: 41000 },
  { plan: "enterprise", seats: 72, arr: 68400 },
  { plan: "enterprise", seats: 95, arr: 78200 },
  { plan: "enterprise", seats: 130, arr: 116000 },
  { plan: "enterprise", seats: 61, arr: 52800 },
  { plan: "enterprise", seats: 88, arr: 91500 },
]

const CONFIG = {
  "self-serve": { label: "Self-serve", color: "var(--ds-chart-2)" },
  enterprise: { label: "Enterprise", color: "var(--ds-chart-1)" },
} satisfies ChartConfig

export default function ScatterChartGroups() {
  return (
    <ScatterChart
      config={CONFIG}
      data={DATA}
      groupKey="plan"
      xKey="seats"
      yKey="arr"
      xLabel="Seats"
      yLabel="ARR (€)"
    />
  )
}
