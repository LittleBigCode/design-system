import type { ComponentProps } from "react"
import { FunnelChart } from "@diametral/design-system/react"

const DATA = [
  { stage: "Sessions", count: 24800 },
  { stage: "Added to cart", count: 6120 },
  { stage: "Checkout started", count: 3480 },
  { stage: "Paid", count: 1910 },
]

export default function FunnelChartPlayground(
  props: Partial<ComponentProps<typeof FunnelChart>>
) {
  return <FunnelChart data={DATA} nameKey="stage" valueKey="count" {...props} />
}
