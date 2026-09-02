import type { ComponentProps } from "react"

import type { ChartConfig } from "@diametral/ui/components/chart"
import {
  ComboChart,
  type ComboSeries,
} from "@diametral/ui/components/combo-chart"

const DATA = [
  { month: "Jan", volume: 1240, rate: 18 },
  { month: "Feb", volume: 1380, rate: 21 },
  { month: "Mar", volume: 1190, rate: 17 },
  { month: "Apr", volume: 1620, rate: 24 },
  { month: "May", volume: 1710, rate: 27 },
  { month: "Jun", volume: 1580, rate: 25 },
]

const CONFIG = {
  volume: { label: "Orders" },
  rate: { label: "Return rate" },
} satisfies ChartConfig

const SERIES = [
  { key: "volume", type: "bar" },
  { key: "rate", type: "line", axis: "right" },
] satisfies ComboSeries[]

const RIGHT_AXIS = {
  label: "Returns",
  domain: [0, 40] as [number, number],
  tickFormatter: (value: number) => `${value}%`,
}

export default function ComboChartPlayground(
  props: Partial<ComponentProps<typeof ComboChart>>
) {
  return (
    <ComboChart
      config={CONFIG}
      data={DATA}
      xAxisKey="month"
      series={SERIES}
      rightAxis={RIGHT_AXIS}
      {...props}
    />
  )
}
