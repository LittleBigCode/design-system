import type { ComponentProps } from "react"

import type { ChartConfig } from "@diametral/ui/components/chart"
import { DonutChart } from "@diametral/ui/components/donut-chart"

const DATA = [
  { tier: "enterprise", mrr: 41200 },
  { tier: "team", mrr: 18600 },
  { tier: "solo", mrr: 7400 },
]

const CONFIG = {
  enterprise: { label: "Enterprise" },
  team: { label: "Team" },
  solo: { label: "Solo" },
} satisfies ChartConfig

// `thickness` arrives from the panel as a string, so it is converted into one
// bag above the JSX — the code strip reprints the element carrying
// `{...props}`, so a conversion written inline would print as source.
export default function DonutChartPlayground({
  thickness,
  ...rest
}: Partial<Omit<ComponentProps<typeof DonutChart>, "thickness">> & {
  thickness?: string
}) {
  const props = {
    ...rest,
    ...(thickness ? { thickness: Number(thickness) } : {}),
  }

  return (
    <DonutChart
      config={CONFIG}
      data={DATA}
      valueKey="mrr"
      nameKey="tier"
      centerLabel="67 200"
      centerCaption="MRR"
      {...props}
    />
  )
}
