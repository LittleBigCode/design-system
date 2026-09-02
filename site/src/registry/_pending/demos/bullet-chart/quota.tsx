import { BulletChart } from "@diametral/ui/components/bullet-chart"

const BANDS = [
  { to: 60, tone: "danger" as const },
  { to: 85, tone: "warning" as const },
  { to: 120, tone: "success" as const },
]

export default function BulletChartQuota() {
  return (
    <BulletChart
      label="New ARR"
      caption="Q3 quota attainment"
      value={68}
      target={85}
      max={120}
      bands={BANDS}
      formatValue={(figure) => `${figure}%`}
      className="w-full max-w-md"
    />
  )
}
