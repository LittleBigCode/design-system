import type { CSSProperties } from "react"

import { FunnelChart } from "@diametral/design-system/react"

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
      className="w-full max-w-xl"
      style={{ "--ds-chart-height": "18rem" } as CSSProperties}
    />
  )
}
