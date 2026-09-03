import type { CSSProperties } from "react"

import { BulletChart, Card } from "@diametral/design-system/react"

const KPIS = [
  {
    label: "Uptime",
    caption: "SLA 99.9%",
    value: 99.96,
    target: 99.9,
    max: 100,
  },
  {
    label: "p95 latency",
    caption: "Budget 250ms",
    value: 188,
    target: 250,
    max: 400,
  },
  {
    label: "Error rate",
    caption: "Budget 0.5%",
    value: 0.31,
    target: 0.5,
    max: 2,
  },
  {
    label: "Deploy frequency",
    caption: "Target 20/week",
    value: 24,
    target: 20,
    max: 40,
  },
]

/* `Card`'s compound parts are batch 7; the incumbent takes its heading as a
   `title` prop, which is the same header in one element.

   `--ds-bullet-label` on the wrapper is the whole point of the knob: one
   declaration retunes the label column for every row at once, so four bullets
   on four different scales still start at the same x. */
export default function BulletChartStack() {
  return (
    <Card className="w-full max-w-md" title="Service health">
      <div
        className="space-y-4"
        style={{ "--ds-bullet-label": "8rem" } as CSSProperties}
      >
        {KPIS.map((kpi) => (
          <BulletChart
            key={kpi.label}
            label={kpi.label}
            caption={kpi.caption}
            value={kpi.value}
            target={kpi.target}
            max={kpi.max}
          />
        ))}
      </div>
    </Card>
  )
}
