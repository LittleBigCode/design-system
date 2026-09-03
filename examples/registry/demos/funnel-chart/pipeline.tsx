import type { CSSProperties } from "react"

import { FunnelChart, type ChartConfig } from "@diametral/design-system/react"

const DATA = [
  { stage: "Leads", deals: 640 },
  { stage: "Qualified", deals: 288 },
  { stage: "Demo booked", deals: 174 },
  { stage: "Proposal sent", deals: 96 },
  { stage: "Closed won", deals: 41 },
]

const CONFIG = {
  "Closed won": { label: "Closed won", color: "var(--ds-chart-3)" },
} satisfies ChartConfig

export default function FunnelChartPipeline() {
  return (
    <FunnelChart
      config={CONFIG}
      data={DATA}
      nameKey="stage"
      valueKey="deals"
      conversion="first"
      className="w-full max-w-xl"
      style={{ "--ds-chart-height": "18rem" } as CSSProperties}
    />
  )
}
