import {
  Button,
  Card,
  Meter,
  MeterLabel,
  MeterValue,
} from "@diametral/design-system/react"

/* Two meters reading the same plan. `MeterValue` takes a render function, so
   the number can be phrased rather than printed bare: the first formats through
   the root's `format` (Intl units — "182 GB"), the second reads the raw value.

   `Panel`'s compound parts are batch 7; this package's `Card` takes its title
   and footer as props, which is the same composition in fewer elements. */
export default function MeterPlanUsage() {
  return (
    <Card
      className="w-full max-w-sm"
      title="Plan usage"
      footer={<Button>Upgrade plan</Button>}
    >
      <div className="flex flex-col gap-6">
        <Meter
          value={182}
          max={250}
          format={{ style: "unit", unit: "gigabyte" }}
        >
          <MeterLabel>Storage</MeterLabel>
          <MeterValue>{(formatted) => `${formatted} of 250 GB`}</MeterValue>
        </Meter>
        <Meter value={34} max={50} tone="warning">
          <MeterLabel>Seats</MeterLabel>
          <MeterValue>{(_, value) => `${value} of 50 used`}</MeterValue>
        </Meter>
      </div>
    </Card>
  )
}
