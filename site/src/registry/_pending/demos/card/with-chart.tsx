import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@diametral/ui/components/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@diametral/ui/components/chart"

const DATA = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 173, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 264, mobile: 140 },
]

const CONFIG = {
  desktop: { label: "Desktop", color: "var(--ds-chart-1)" },
  mobile: { label: "Mobile", color: "var(--ds-chart-2)" },
} satisfies ChartConfig

export default function CardWithChart() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sessions</CardTitle>
        <CardDescription>January – June 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={CONFIG} className="h-40 w-full">
          <BarChart data={DATA}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" />
            <Bar dataKey="mobile" fill="var(--color-mobile)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
