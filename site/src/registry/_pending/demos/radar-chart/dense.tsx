import type { ChartConfig } from "@diametral/ui/components/chart"
import { RadarChart } from "@diametral/ui/components/radar-chart"

const DATA = [
  { control: "AC", score: 78 },
  { control: "AT", score: 64 },
  { control: "AU", score: 91 },
  { control: "CA", score: 55 },
  { control: "CM", score: 72 },
  { control: "CP", score: 48 },
  { control: "IA", score: 86 },
  { control: "IR", score: 61 },
  { control: "MA", score: 70 },
  { control: "PE", score: 83 },
  { control: "RA", score: 59 },
  { control: "SC", score: 74 },
]

const CONFIG = {
  score: { label: "Coverage (%)", color: "var(--ds-chart-3)" },
} satisfies ChartConfig

export default function RadarChartDense() {
  return (
    <RadarChart
      config={CONFIG}
      data={DATA}
      dimensionKey="control"
      domain={[0, 100]}
      grid={false}
      fillOpacity={0.35}
      className="h-72"
    />
  )
}
