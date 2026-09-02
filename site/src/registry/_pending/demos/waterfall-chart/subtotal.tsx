import { WaterfallChart } from "@diametral/ui/components/waterfall-chart"

const DATA = [
  { step: "Headcount Q1", people: 84 },
  { step: "Graduates", people: 12 },
  { step: "Senior hires", people: 7 },
  { step: "Attrition", people: -9 },
  { step: "Headcount Q2", people: 94 },
  { step: "Contractors converted", people: 5 },
  { step: "Attrition Q3", people: -6 },
  { step: "Headcount Q3", people: 93 },
]

export default function WaterfallChartSubtotal() {
  return (
    <WaterfallChart
      data={DATA}
      nameKey="step"
      valueKey="people"
      totalKeys={["Headcount Q1", "Headcount Q2", "Headcount Q3"]}
      margin={{ top: 8, right: 20, bottom: 24, left: 20 }}
      className="h-64 w-full max-w-3xl"
    />
  )
}
