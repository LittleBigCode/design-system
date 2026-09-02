import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@diametral/ui/components/panel"
import {
  Timeline,
  TimelineContent,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@diametral/ui/components/timeline"

const STAGES = [
  { title: "Handed to carrier", time: "Mon 08:20", state: "completed" },
  { title: "In transit", time: "Tue 06:45", state: "completed" },
  { title: "Out for delivery", time: "Tue 11:10", state: "active" },
  { title: "Delivered", time: "Expected today", state: undefined },
]

export default function TimelineInPanel() {
  return (
    <Panel className="w-full max-w-xs">
      <PanelHeader className="border-b">
        <PanelTitle>Shipment</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <Timeline>
          {STAGES.map((stage) => (
            <TimelineItem
              key={stage.title}
              data-state={stage.state}
              className="pb-4"
            >
              <TimelineIndicator />
              <TimelineContent>
                <TimelineTitle>{stage.title}</TimelineTitle>
                <TimelineTime>{stage.time}</TimelineTime>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </PanelContent>
    </Panel>
  )
}
