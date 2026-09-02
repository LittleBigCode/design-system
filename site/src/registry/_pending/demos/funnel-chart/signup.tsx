import { FunnelChart } from "@diametral/ui/components/funnel-chart"

const DATA = [
  { stage: "Visited", users: 48200 },
  { stage: "Signed up", users: 12400 },
  { stage: "Verified email", users: 9800 },
  { stage: "Created a project", users: 5100 },
  { stage: "Invited a teammate", users: 2240 },
]

export default function FunnelChartSignup() {
  return (
    <FunnelChart
      data={DATA}
      nameKey="stage"
      valueKey="users"
      className="h-72 w-full max-w-xl"
    />
  )
}
