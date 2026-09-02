import type { ComponentProps } from "react"

import { Heatmap } from "@diametral/ui/components/heatmap"

const SERVICES = ["api", "worker", "web", "cron"]
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"]

const DATA = SERVICES.flatMap((service, s) =>
  DAYS.map((day, d) => ({
    x: day,
    y: service,
    value: Math.round(Math.abs(Math.sin(s * 2.2 + d * 0.8)) * 48),
  }))
)

export default function HeatmapPlayground(
  props: Partial<ComponentProps<typeof Heatmap>>
) {
  return <Heatmap data={DATA} cellSize={28} {...props} />
}
