import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  type ChartConfig,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@diametral/ui/components/chart"

const DATA = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 173, mobile: 190 },
]

const CONFIG = {
  desktop: { label: "Desktop", color: "var(--ds-khaki)" },
  mobile: { label: "Mobile", color: "var(--ds-blue)" },
} satisfies ChartConfig

// Chart is configured through the `config` object and its recharts children, not
// through enumerable props — so there is nothing for a control panel to drive.
// The panel is empty on purpose; the examples below are the real documentation.
export default function ChartPlayground(
  props: Omit<
    React.ComponentProps<typeof ChartContainer>,
    "config" | "children"
  >
) {
  return (
    <ChartContainer {...props} config={CONFIG} className="h-56 w-full">
      <BarChart data={DATA}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" />
        <Bar dataKey="mobile" fill="var(--color-mobile)" />
      </BarChart>
    </ChartContainer>
  )
}
