import type { CSSProperties } from "react"

import { StackedBar, type ChartConfig } from "@diametral/design-system/react"

const DATA = [{ storage: 6.2, media: 2.4, backups: 1.1, free: 0.3 }]

const CONFIG = {
  storage: { label: "Documents" },
  media: { label: "Media" },
  backups: { label: "Backups" },
  free: { label: "Free" },
} satisfies ChartConfig

export default function StackedBarBasic() {
  return (
    <StackedBar
      config={CONFIG}
      data={DATA}
      style={{ "--ds-chart-height": "6rem" } as CSSProperties}
    />
  )
}
