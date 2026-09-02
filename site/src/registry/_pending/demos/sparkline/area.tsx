import { Sparkline } from "@diametral/ui/components/sparkline"

const SERIES = [
  {
    label: "Deploys",
    data: [4, 7, 5, 11, 9, 14, 12, 18],
    stroke: "var(--ds-chart-3)",
  },
  {
    label: "Rollbacks",
    data: [3, 2, 4, 2, 5, 3, 6, 2],
    stroke: "var(--ds-chart-1)",
  },
]

export default function SparklineArea() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      {SERIES.map((series) => (
        <div key={series.label} className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{series.label}</span>
          <Sparkline
            data={series.data}
            stroke={series.stroke}
            fill
            showDot
            width={140}
            aria-label={`${series.label} over the last 8 weeks`}
          />
        </div>
      ))}
    </div>
  )
}
