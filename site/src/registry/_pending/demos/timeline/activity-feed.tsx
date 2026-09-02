import {
  ChatCircleIcon,
  PencilSimpleIcon,
  SealCheckIcon,
  UploadSimpleIcon,
} from "@phosphor-icons/react"

import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@diametral/ui/components/timeline"

const ACTIVITY = [
  {
    icon: SealCheckIcon,
    title: "Approved",
    time: "16:40",
    dateTime: "2026-07-14T16:40",
    detail: "Augustin Morval approved release 0.4.0.",
  },
  {
    icon: ChatCircleIcon,
    title: "Comment",
    time: "14:02",
    dateTime: "2026-07-14T14:02",
    detail: "Camille Roy asked for a tighter caption on the stat tiles.",
  },
  {
    icon: PencilSimpleIcon,
    title: "Tokens edited",
    time: "11:27",
    dateTime: "2026-07-14T11:27",
    detail: "Four spacing tokens renamed in the beige scale.",
  },
  {
    icon: UploadSimpleIcon,
    title: "Files uploaded",
    time: "09:12",
    dateTime: "2026-07-14T09:12",
    detail: "Three source files added to the brief.",
  },
]

export default function TimelineActivityFeed() {
  return (
    <Timeline className="w-full max-w-md">
      {ACTIVITY.map(({ icon: Icon, ...event }) => (
        <TimelineItem key={event.title}>
          <TimelineIndicator>
            <Icon />
          </TimelineIndicator>
          <TimelineContent>
            <TimelineTitle>{event.title}</TimelineTitle>
            <TimelineTime dateTime={event.dateTime}>{event.time}</TimelineTime>
            <TimelineDescription>{event.detail}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
