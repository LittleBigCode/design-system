import { Heatmap } from "@diametral/ui/components/heatmap"

const REGIONS = ["eu-west", "eu-north", "us-east"]
const HOURS = ["00", "04", "08", "12", "16", "20"]

const build = (factor: number) =>
  REGIONS.flatMap((region, r) =>
    HOURS.map((hour, h) => ({
      x: hour,
      y: region,
      value: Math.round((30 + Math.abs(Math.sin(r + h * 0.9)) * 70) * factor),
    }))
  )

const SCALE = { max: 100 }

export default function HeatmapPinned() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <figure className="space-y-2">
        <figcaption className="text-xs font-semibold tracking-wide uppercase">
          Last week
        </figcaption>
        <Heatmap
          data={build(0.55)}
          scale={SCALE}
          cellSize={24}
          formatValue={(value) => `${value}% utilisation`}
        />
      </figure>
      <figure className="space-y-2">
        <figcaption className="text-xs font-semibold tracking-wide uppercase">
          This week
        </figcaption>
        <Heatmap
          data={build(1)}
          scale={SCALE}
          cellSize={24}
          formatValue={(value) => `${value}% utilisation`}
        />
      </figure>
    </div>
  )
}
