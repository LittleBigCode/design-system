import type { ComponentProps } from "react"

import { BulletChart } from "@diametral/ui/components/bullet-chart"

const BANDS = [
  { to: 40, tone: "danger" as const },
  { to: 75, tone: "warning" as const },
  { to: 100, tone: "success" as const },
]

export default function BulletChartPlayground(
  props: Partial<ComponentProps<typeof BulletChart>>
) {
  return (
    <BulletChart
      label="{label}"
      caption="{caption}"
      value={62}
      target={80}
      max={100}
      bands={BANDS}
      className="w-full max-w-md"
      {...props}
    />
  )
}
