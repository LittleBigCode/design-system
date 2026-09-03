import type { CSSProperties } from "react"

import { ScatterChart, type ChartConfig } from "@diametral/design-system/react"

const DATA = Array.from({ length: 320 }, (_, i) => {
  const wobble = Math.sin(i * 2.399) * Math.cos(i * 0.717)
  const payload = 40 + ((i * 37) % 260) + wobble * 18
  return {
    payload: Math.round(payload),
    duration: Math.round(38 + payload * 0.42 + wobble * 46),
  }
})

const CONFIG = {
  requests: { label: "Requests", color: "var(--ds-chart-2)" },
} satisfies ChartConfig

export default function ScatterChartDense() {
  return (
    <ScatterChart
      config={CONFIG}
      data={DATA}
      xKey="payload"
      yKey="duration"
      xLabel="Payload (KB)"
      yLabel="Duration (ms)"
      grid={false}
      style={{ "--ds-chart-height": "18rem" } as CSSProperties}
    />
  )
}
