import type { ChartConfig } from "@diametral/ui/components/chart"
import { StackedBar } from "@diametral/ui/components/stacked-bar"

const DATA = [{ storage: 6.2, media: 2.4, backups: 1.1, free: 0.3 }]

const CONFIG = {
  storage: { label: "Documents" },
  media: { label: "Media" },
  backups: { label: "Backups" },
  free: { label: "Free" },
} satisfies ChartConfig

export default function StackedBarBasic() {
  return <StackedBar config={CONFIG} data={DATA} className="h-24" />
}
