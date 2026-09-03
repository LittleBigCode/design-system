import type { CSSProperties } from "react"

import { FunnelChart } from "@diametral/design-system/react"

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
      className="w-full max-w-xl"
      style={{ "--ds-chart-height": "10rem" } as CSSProperties}
    />
  )
}
