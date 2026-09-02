import { ReferenceLine } from "recharts"

import type { ChartConfig } from "@diametral/ui/components/chart"
import { ScatterChart } from "@diametral/ui/components/scatter-chart"

const DATA = [
  { weight: 480, bounce: 31 },
  { weight: 620, bounce: 34 },
  { weight: 710, bounce: 38 },
  { weight: 940, bounce: 41 },
  { weight: 1180, bounce: 47 },
  { weight: 1320, bounce: 52 },
  { weight: 1610, bounce: 58 },
  { weight: 1840, bounce: 55 },
  { weight: 2100, bounce: 64 },
  { weight: 2480, bounce: 71 },
]

const CONFIG = {
  pages: { label: "Landing pages" },
} satisfies ChartConfig

export default function ScatterChartCorrelation() {
  return (
    <ScatterChart
      config={CONFIG}
      data={DATA}
      xKey="weight"
      yKey="bounce"
      xLabel="Page weight (KB)"
      yLabel="Bounce rate (%)"
    >
      <ReferenceLine
        y={50}
        strokeDasharray="4 4"
        stroke="var(--ds-danger)"
        label={{
          value: "Alert at 50%",
          position: "insideTopRight",
          fontSize: 11,
        }}
      />
    </ScatterChart>
  )
}
