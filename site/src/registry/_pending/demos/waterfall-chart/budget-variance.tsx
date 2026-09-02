import { WaterfallChart } from "@diametral/ui/components/waterfall-chart"

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
      className="h-64 w-full max-w-2xl"
    />
  )
}
