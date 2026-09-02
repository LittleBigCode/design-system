import { Meter, MeterLabel, MeterValue } from "@diametral/ui/components/meter"

export default function MeterBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <Meter value={68}>
        <MeterLabel>Storage used</MeterLabel>
        <MeterValue />
      </Meter>

      <Meter value={128} max={256} format={{ style: "unit", unit: "gigabyte" }}>
        <MeterLabel>Quota</MeterLabel>
        <MeterValue />
      </Meter>
    </div>
  )
}
