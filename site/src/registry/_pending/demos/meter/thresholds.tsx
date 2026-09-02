import { Meter, MeterLabel, MeterValue } from "@diametral/ui/components/meter"

const USAGE = [
  { label: "Design", value: 34 },
  { label: "Engineering", value: 71 },
  { label: "Support", value: 96 },
]

function tone(value: number) {
  if (value >= 90) return "danger" as const
  if (value >= 70) return "warning" as const
  return "success" as const
}

export default function MeterThresholds() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      {USAGE.map((row) => (
        <Meter key={row.label} value={row.value} tone={tone(row.value)}>
          <MeterLabel>{row.label}</MeterLabel>
          <MeterValue />
        </Meter>
      ))}
    </div>
  )
}
