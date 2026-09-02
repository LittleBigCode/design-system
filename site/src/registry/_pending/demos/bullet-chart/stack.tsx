import { BulletChart } from "@diametral/ui/components/bullet-chart"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@diametral/ui/components/card"

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

export default function BulletChartStack() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Service health</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 [--bullet-label:8rem]">
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
      </CardContent>
    </Card>
  )
}
