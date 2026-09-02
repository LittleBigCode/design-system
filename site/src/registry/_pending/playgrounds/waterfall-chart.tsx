import type { ComponentProps } from "react"

import { WaterfallChart } from "@diametral/ui/components/waterfall-chart"

const DATA = [
  { step: "Opening", value: 12000 },
  { step: "New", value: 3400 },
  { step: "Upsell", value: 1200 },
  { step: "Downgrade", value: -800 },
  { step: "Churn", value: -1500 },
  { step: "Closing", value: 14300 },
]

const TOTAL_KEYS = ["Opening", "Closing"]

export default function WaterfallChartPlayground(
  props: Partial<ComponentProps<typeof WaterfallChart>>
) {
  return (
    <WaterfallChart
      data={DATA}
      nameKey="step"
      valueKey="value"
      totalKeys={TOTAL_KEYS}
      {...props}
    />
  )
}
