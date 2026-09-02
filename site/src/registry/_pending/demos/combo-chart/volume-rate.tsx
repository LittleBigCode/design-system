import type { ChartConfig } from "@diametral/ui/components/chart"
import {
  ComboChart,
  type ComboSeries,
} from "@diametral/ui/components/combo-chart"

const DATA = [
  { week: "W1", signups: 412, activation: 22 },
  { week: "W2", signups: 468, activation: 24 },
  { week: "W3", signups: 521, activation: 21 },
  { week: "W4", signups: 604, activation: 27 },
  { week: "W5", signups: 588, activation: 31 },
  { week: "W6", signups: 641, activation: 33 },
  { week: "W7", signups: 697, activation: 35 },
]

const CONFIG = {
  signups: { label: "Signups", color: "var(--ds-chart-4)" },
  activation: { label: "Activated within 7d", color: "var(--ds-chart-1)" },
} satisfies ChartConfig

const SERIES = [
  { key: "signups", type: "area" },
  { key: "activation", type: "line", axis: "right" },
] satisfies ComboSeries[]

export default function ComboChartVolumeRate() {
  return (
    <ComboChart
      config={CONFIG}
      data={DATA}
      xAxisKey="week"
      series={SERIES}
      rightAxis={{
        label: "Activation",
        domain: [0, 60],
        tickFormatter: (value) => `${value}%`,
      }}
    />
  )
}
