import type { ChartConfig } from "@diametral/ui/components/chart"
import { PieChart } from "@diametral/ui/components/pie-chart"

const DATA = [
  { state: "resolved", tickets: 148 },
  { state: "open", tickets: 32 },
  { state: "waiting", tickets: 11 },
]

const CONFIG = {
  resolved: { label: "Resolved" },
  open: { label: "Open" },
  waiting: { label: "Waiting on customer" },
} satisfies ChartConfig

export default function PieChartCompact() {
  return (
    <div className="flex w-full max-w-sm items-center gap-6">
      <PieChart
        config={CONFIG}
        data={DATA}
        valueKey="tickets"
        nameKey="state"
        legend={false}
        className="h-28 shrink-0"
      />
      <dl className="grid gap-1 text-sm">
        {DATA.map((row) => (
          <div key={row.state} className="flex justify-between gap-6">
            <dt className="text-muted-foreground">
              {CONFIG[row.state as keyof typeof CONFIG].label}
            </dt>
            <dd className="tabular-nums">{row.tickets}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
