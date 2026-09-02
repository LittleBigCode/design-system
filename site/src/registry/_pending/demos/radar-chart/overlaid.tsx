import type { ChartConfig } from "@diametral/ui/components/chart"
import { RadarChart } from "@diametral/ui/components/radar-chart"

const DATA = [
  { skill: "TypeScript", required: 4, candidate: 5 },
  { skill: "System design", required: 4, candidate: 3 },
  { skill: "Accessibility", required: 3, candidate: 4 },
  { skill: "Data modelling", required: 4, candidate: 2 },
  { skill: "Mentoring", required: 2, candidate: 4 },
  { skill: "Incident response", required: 3, candidate: 3 },
]

const CONFIG = {
  required: { label: "Role requirement", color: "var(--ds-chart-2)" },
  candidate: { label: "Candidate", color: "var(--ds-chart-1)" },
} satisfies ChartConfig

export default function RadarChartOverlaid() {
  return (
    <RadarChart
      config={CONFIG}
      data={DATA}
      dimensionKey="skill"
      domain={[0, 5]}
      radiusAxis
    />
  )
}
