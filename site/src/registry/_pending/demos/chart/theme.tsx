import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@diametral/ui/components/chart"

const DATA = [
  { quarter: "Q1", licences: 320, services: 140 },
  { quarter: "Q2", licences: 410, services: 190 },
  { quarter: "Q3", licences: 380, services: 220 },
  { quarter: "Q4", licences: 470, services: 260 },
]

const CONFIG = {
  licences: { label: "Licences", color: "var(--ds-chart-1)" },
  // A partner's own navy: legible on white, all but invisible on the dark
  // page. `theme` is the two-value form of `color` for exactly this case.
  services: { label: "Services", theme: { light: "#1b2a4a", dark: "#8fa6d4" } },
} satisfies ChartConfig

export default function ChartTheme() {
  return (
    <ChartContainer config={CONFIG} className="h-56 w-full">
      <BarChart data={DATA}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="quarter" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="licences" fill="var(--color-licences)" radius={2} />
        <Bar dataKey="services" fill="var(--color-services)" radius={2} />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  )
}
