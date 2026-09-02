import type { ChartConfig } from "@diametral/ui/components/chart"
import { RadarChart } from "@diametral/ui/components/radar-chart"

const EU = [
  { channel: "Organic", share: 38 },
  { channel: "Paid", share: 22 },
  { channel: "Referral", share: 11 },
  { channel: "Email", share: 18 },
  { channel: "Social", share: 9 },
]

const US = [
  { channel: "Organic", share: 21 },
  { channel: "Paid", share: 34 },
  { channel: "Referral", share: 6 },
  { channel: "Email", share: 12 },
  { channel: "Social", share: 17 },
]

const CONFIG = {
  share: { label: "Share of signups (%)" },
} satisfies ChartConfig

export default function RadarChartPinned() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      <figure className="space-y-1">
        <RadarChart
          config={CONFIG}
          data={EU}
          dimensionKey="channel"
          domain={[0, 40]}
          className="h-48"
        />
        <figcaption className="text-center text-xs text-muted-foreground">
          Europe
        </figcaption>
      </figure>
      <figure className="space-y-1">
        <RadarChart
          config={CONFIG}
          data={US}
          dimensionKey="channel"
          domain={[0, 40]}
          className="h-48"
        />
        <figcaption className="text-center text-xs text-muted-foreground">
          North America
        </figcaption>
      </figure>
    </div>
  )
}
