import { FunnelChart } from "@diametral/ui/components/funnel-chart"

const DATA = [
  { step: "Application received", candidates: 1840 },
  { step: "Passed CV screening", candidates: 412 },
  { step: "Completed take-home exercise", candidates: 168 },
  { step: "Attended on-site interview", candidates: 74 },
  { step: "Offer extended and accepted", candidates: 19 },
]

export default function FunnelChartLongLabels() {
  return (
    <FunnelChart
      data={DATA}
      nameKey="step"
      valueKey="candidates"
      margin={{ top: 8, right: 240, bottom: 8, left: 56 }}
      className="h-72 w-full max-w-2xl"
    />
  )
}
