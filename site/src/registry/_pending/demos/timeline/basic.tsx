import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@diametral/ui/components/timeline"

const EVENTS = [
  {
    title: "Brief received",
    time: "12 June",
    description: "Scope and success criteria signed off with the client.",
  },
  {
    title: "Concepts",
    time: "28 June",
    description: "Three directions presented, the second one kept.",
  },
  {
    title: "Handover",
    time: "15 July",
    description: "Design system shipped with its documentation.",
  },
]

export default function TimelineBasic() {
  return (
    <Timeline className="max-w-md">
      {EVENTS.map((event, index) => (
        <TimelineItem key={event.title}>
          <TimelineIndicator>{index + 1}</TimelineIndicator>
          <TimelineContent>
            <TimelineTitle>{event.title}</TimelineTitle>
            <TimelineTime>{event.time}</TimelineTime>
            <TimelineDescription>{event.description}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
