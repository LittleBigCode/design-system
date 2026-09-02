import { CheckIcon } from "@phosphor-icons/react"

import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTitle,
} from "@diametral/ui/components/timeline"

const STEPS = [
  { title: "Quote signed", state: "completed" },
  { title: "Deposit received", state: "completed" },
  { title: "Production", state: "active" },
  { title: "Invoicing", state: undefined },
]

export default function TimelineStates() {
  return (
    <Timeline className="max-w-md">
      {STEPS.map((step) => (
        <TimelineItem key={step.title} data-state={step.state}>
          <TimelineIndicator>
            {step.state === "completed" ? <CheckIcon /> : null}
          </TimelineIndicator>
          <TimelineContent>
            <TimelineTitle>{step.title}</TimelineTitle>
            {step.state === "active" && (
              <TimelineDescription>In progress</TimelineDescription>
            )}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
