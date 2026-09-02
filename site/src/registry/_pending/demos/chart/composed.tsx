import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@diametral/ui/components/chart"

const DATA = [
  { week: "W1", signups: 42, average: 42 },
  { week: "W2", signups: 78, average: 60 },
  { week: "W3", signups: 61, average: 60 },
  { week: "W4", signups: 95, average: 69 },
  { week: "W5", signups: 74, average: 77 },
  { week: "W6", signups: 118, average: 87 },
]

const CONFIG = {
  signups: { label: "Signups", color: "var(--ds-chart-1)" },
  average: { label: "4-week average", color: "var(--ds-chart-2)" },
} satisfies ChartConfig

export default function ChartComposed() {
  return (
    <ChartContainer config={CONFIG} className="h-64 w-full">
      <ComposedChart data={DATA}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="week" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} width={32} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="signups" fill="var(--color-signups)" radius={2} />
        <Line
          dataKey="average"
          stroke="var(--color-average)"
          strokeWidth={2}
          dot={false}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </ComposedChart>
    </ChartContainer>
  )
}
