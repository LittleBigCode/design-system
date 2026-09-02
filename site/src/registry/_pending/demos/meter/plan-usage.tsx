import { Button } from "@diametral/ui/components/button"
import { Meter, MeterLabel, MeterValue } from "@diametral/ui/components/meter"
import {
  Panel,
  PanelContent,
  PanelFooter,
  PanelHeader,
  PanelTitle,
} from "@diametral/ui/components/panel"

export default function MeterPlanUsage() {
  return (
    <Panel className="w-full max-w-sm">
      <PanelHeader className="border-b">
        <PanelTitle>Plan usage</PanelTitle>
      </PanelHeader>
      <PanelContent className="flex flex-col gap-6">
        <Meter
          value={182}
          max={250}
          format={{ style: "unit", unit: "gigabyte" }}
        >
          <MeterLabel>Storage</MeterLabel>
          <MeterValue>{(formatted) => `${formatted} of 250 GB`}</MeterValue>
        </Meter>
        <Meter value={34} max={50}>
          <MeterLabel>Seats</MeterLabel>
          <MeterValue>{(_, value) => `${value} of 50 used`}</MeterValue>
        </Meter>
      </PanelContent>
      <PanelFooter className="border-t">
        <Button size="sm" variant="outline">
          Upgrade plan
        </Button>
      </PanelFooter>
    </Panel>
  )
}
