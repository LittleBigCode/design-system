import type { ChartConfig } from "@diametral/ui/components/chart"
import { Treemap } from "@diametral/ui/components/treemap"

const DATA = [
  {
    name: "Platform",
    children: [
      { name: "Ingest", value: 4200 },
      { name: "Scheduler", value: 2600 },
      { name: "Registry", value: 1400 },
    ],
  },
  {
    name: "Product",
    children: [
      { name: "Web app", value: 3800 },
      { name: "Mobile", value: 1900 },
      { name: "Embeds", value: 700 },
    ],
  },
  {
    name: "Data",
    children: [
      { name: "Warehouse", value: 3100 },
      { name: "Pipelines", value: 1200 },
    ],
  },
]

const CONFIG = {
  Platform: { label: "Platform", color: "var(--ds-chart-2)" },
  Product: { label: "Product", color: "var(--ds-chart-1)" },
  Data: { label: "Data", color: "var(--ds-chart-3)" },
} satisfies ChartConfig

export default function TreemapTwoLevel() {
  return (
    <div className="w-full space-y-3">
      <Treemap
        config={CONFIG}
        data={DATA}
        formatValue={(value) => `${value} GB`}
        className="h-72"
      />
      <ul className="flex flex-wrap items-center gap-4 text-xs">
        {Object.entries(CONFIG).map(([key, entry]) => (
          <li key={key} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            {entry.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
