import * as React from "react"
import {
  Panel,
  PanelHeader,
  PanelTitle,
  Timeline,
  TimelineContent,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@diametral/design-system/react"

const STAGES = [
  { title: "Handed to carrier", time: "Mon 08:20", state: "completed" },
  { title: "In transit", time: "Tue 06:45", state: "completed" },
  { title: "Out for delivery", time: "Tue 11:10", state: "active" },
  { title: "Delivered", time: "Expected today", state: undefined },
]

/* The tighter row spacing is `--ds-timeline-gap`, not a `pb-4` utility: the
   source relied on tailwind-merge to dedupe that literal against the
   component's own `pb-8`, and there is no tailwind-merge in this package.
   Panel is the absorbed parts since 1.0.0-beta.7, so its heading is a
   PanelTitle element rather than a `title` prop. */
export default function TimelineInPanel() {
  return (
    <Panel className="w-full max-w-xs">
      <PanelHeader>
        <PanelTitle>Shipment</PanelTitle>
      </PanelHeader>
      <Timeline style={{ "--ds-timeline-gap": "1rem" } as React.CSSProperties}>
        {STAGES.map((stage) => (
          <TimelineItem key={stage.title} data-state={stage.state}>
            <TimelineIndicator />
            <TimelineContent>
              <TimelineTitle>{stage.title}</TimelineTitle>
              <TimelineTime>{stage.time}</TimelineTime>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Panel>
  )
}
