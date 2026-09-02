import { BulletChart } from "@diametral/ui/components/bullet-chart"

export default function BulletChartNoTarget() {
  return (
    <BulletChart
      label="Storage used"
      caption="No quota set on this plan"
      value={318}
      max={500}
      formatValue={(figure) => `${figure} GB`}
      className="w-full max-w-md"
    />
  )
}
