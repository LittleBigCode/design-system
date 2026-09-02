import { Gauge } from "@diametral/ui/components/gauge"

export default function GaugeBasic() {
  return (
    <div className="flex flex-wrap gap-8">
      <Gauge value={62} label="Score" />
      <Gauge value={128} max={256} label="Quota" />
    </div>
  )
}
