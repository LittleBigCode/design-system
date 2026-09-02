import type { ChartConfig } from "@diametral/ui/components/chart"
import { ScatterChart } from "@diametral/ui/components/scatter-chart"

const DATA = [
  { country: "France", gdp: 44, life: 82.5, population: 68 },
  { country: "Germany", gdp: 52, life: 81.2, population: 84 },
  { country: "Portugal", gdp: 27, life: 81.9, population: 10 },
  { country: "Poland", gdp: 22, life: 78.3, population: 37 },
  { country: "Sweden", gdp: 56, life: 83.1, population: 11 },
  { country: "Italy", gdp: 38, life: 83.4, population: 59 },
  { country: "Ireland", gdp: 104, life: 82.6, population: 5 },
  { country: "Romania", gdp: 18, life: 76.1, population: 19 },
]

const CONFIG = {
  countries: { label: "EU member states", color: "var(--ds-chart-5)" },
} satisfies ChartConfig

export default function ScatterChartBubble() {
  return (
    <ScatterChart
      config={CONFIG}
      data={DATA}
      xKey="gdp"
      yKey="life"
      sizeKey="population"
      xLabel="GDP per capita (€k)"
      yLabel="Life expectancy"
      className="h-72"
    />
  )
}
