import type { CSSProperties } from "react"

import { WaterfallChart } from "@diametral/design-system/react"

const DATA = [
  { line: "Budget", amount: 480000 },
  { line: "Headcount", amount: -62000 },
  { line: "Tooling", amount: -18000 },
  { line: "Recruitment", amount: 24000 },
  { line: "Travel", amount: -9000 },
  { line: "Actuals", amount: 415000 },
]

export default function WaterfallChartBudgetVariance() {
  return (
    <WaterfallChart
      data={DATA}
      nameKey="line"
      valueKey="amount"
      totalKeys={["Budget", "Actuals"]}
      formatValue={(value) => `€${(value / 1000).toFixed(0)}k`}
      className="w-full max-w-2xl"
      style={{ "--ds-chart-height": "16rem" } as CSSProperties}
    />
  )
}
