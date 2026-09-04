import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Meter,
  MeterLabel,
  MeterValue,
} from "@diametral/design-system/react"

/* Two meters reading the same plan. `MeterValue` takes a render function, so
   the number can be phrased rather than printed bare: the first formats through
   the root's `format` (Intl units — "182 GB"), the second reads the raw value.

   `Card`'s compound parts landed in 1.0.0-beta.7, so the title and the footer
   action are elements rather than props. */
export default function MeterPlanUsage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Plan usage</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
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
      </CardContent>
      <CardFooter>
        <Button>Upgrade plan</Button>
      </CardFooter>
    </Card>
  )
}
