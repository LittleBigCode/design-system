import {
  SealCheckIcon,
  SealWarningIcon,
  UploadSimpleIcon,
  WarningIcon,
} from "@phosphor-icons/react"

import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@diametral/design-system/react"

const EVENTS = [
  {
    tone: "success" as const,
    icon: SealCheckIcon,
    title: "Mission confirmed",
    time: "09:42",
    detail: "Day rate locked at €900 after Director sign-off.",
  },
  {
    tone: "info" as const,
    icon: SealWarningIcon,
    title: "Review requested",
    time: "09:30",
    detail: "Sent to the Director for approval.",
  },
  {
    tone: "warning" as const,
    icon: WarningIcon,
    title: "Margin below target",
    time: "08:15",
    detail: "Computed margin 28% — under the 30% floor.",
  },
  {
    tone: "danger" as const,
    icon: WarningIcon,
    title: "Currency missing",
    time: "Yesterday",
    detail: "Salary entered without a currency.",
  },
  {
    tone: undefined,
    icon: UploadSimpleIcon,
    title: "Draft created",
    time: "2 days ago",
    detail: "Imported from the Q3 template.",
  },
]

export default function Activity01() {
  return (
    <div className="w-full p-6">
      <Timeline>
        {EVENTS.map(({ icon: Icon, ...event }) => (
          <TimelineItem key={event.title} tone={event.tone}>
            <TimelineIndicator>
              <Icon />
            </TimelineIndicator>
            <TimelineContent>
              <TimelineTitle>{event.title}</TimelineTitle>
              <TimelineTime>{event.time}</TimelineTime>
              <TimelineDescription>{event.detail}</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
