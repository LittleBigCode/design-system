import type { ComponentProps } from "react"

import type { ChartConfig } from "@diametral/ui/components/chart"
import { StackedBar } from "@diametral/ui/components/stacked-bar"

const DATA = [
  { team: "Platform", shipped: 18, review: 6, blocked: 3 },
  { team: "Brand", shipped: 11, review: 9, blocked: 1 },
  { team: "Data", shipped: 14, review: 4, blocked: 6 },
]

const CONFIG = {
  shipped: { label: "Shipped" },
  review: { label: "In review" },
  blocked: { label: "Blocked" },
} satisfies ChartConfig

export default function StackedBarPlayground(
  props: Partial<ComponentProps<typeof StackedBar>>
) {
  return <StackedBar config={CONFIG} data={DATA} labelKey="team" {...props} />
}
