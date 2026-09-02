import { Gauge } from "@diametral/ui/components/gauge"

export default function GaugeThresholds() {
  return (
    <div className="flex flex-wrap gap-8">
      <Gauge
        value={45}
        label="Healthy"
        thresholds={[
          { at: 0, color: "var(--ds-danger)" },
          { at: 50, color: "var(--ds-warning)" },
          { at: 80, color: "var(--ds-success)" },
        ]}
      />
      <Gauge
        value={92}
        label="Critical"
        thresholds={[
          { at: 0, color: "var(--ds-danger)" },
          { at: 50, color: "var(--ds-warning)" },
          { at: 80, color: "var(--ds-success)" },
        ]}
      />
    </div>
  )
}
