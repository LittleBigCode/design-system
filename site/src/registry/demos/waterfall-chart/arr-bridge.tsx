import type { CSSProperties } from "react"

import { WaterfallChart } from "@diametral/design-system/react"

const DATA = [
  { step: "Opening ARR", change: 1840000 },
  { step: "New", change: 412000 },
  { step: "Expansion", change: 186000 },
  { step: "Contraction", change: -94000 },
  { step: "Churn", change: -158000 },
  { step: "Closing ARR", change: 2186000 },
]

export default function WaterfallChartArrBridge() {
  return (
    <WaterfallChart
      data={DATA}
      nameKey="step"
      valueKey="change"
      totalKeys={["Opening ARR", "Closing ARR"]}
      formatValue={(value) => `€${(value / 1000).toFixed(0)}k`}
      className="w-full max-w-2xl"
      style={{ "--ds-chart-height": "16rem" } as CSSProperties}
    />
  )
}
