import type { ComponentProps } from "react"

import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@diametral/ui/components/timeline"

// `Timeline` itself is an `ol` with no props of its own — the state that changes
// anything visually is `data-state` on the item, so that is the subject.
export default function TimelinePlayground({
  children,
  ...props
}: ComponentProps<typeof TimelineItem>) {
  return (
    <Timeline className="w-full max-w-sm">
      <TimelineItem {...props}>
        <TimelineIndicator>1</TimelineIndicator>
        <TimelineContent>
          <TimelineTitle>{children}</TimelineTitle>
          <TimelineTime dateTime="2026-08-03T09:12">09:12</TimelineTime>
          <TimelineDescription>
            Scope and success criteria signed off.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator>2</TimelineIndicator>
        <TimelineContent>
          <TimelineTitle>Concepts</TimelineTitle>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
