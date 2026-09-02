import { Gauge } from "@diametral/ui/components/gauge"

export default function GaugeFormatted() {
  return (
    <div className="flex flex-wrap gap-8">
      <Gauge value={62} size={150} label="Coverage" format={(v) => `${v}%`} />
      <Gauge
        value={4200}
        max={10000}
        size={150}
        thickness={8}
        label="Signups"
        format={(v) => `${(v / 1000).toFixed(1)}k`}
      />
    </div>
  )
}
