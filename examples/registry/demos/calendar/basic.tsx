import { Calendar } from "@diametral/design-system/react"

// Fixed rather than derived from `new Date()`: the visual suite diffs a
// screenshot of this demo, and a month that moves would fail every month.
const MONTH = "2026-03-01"

const EVENTS = [
  { date: "2026-03-04", label: "Design review", status: "info" as const },
  { date: "2026-03-11", label: "Token freeze", status: "warning" as const },
  { date: "2026-03-11", label: "Beta cut", status: "info" as const },
  { date: "2026-03-19", label: "Release 1.0.0", status: "success" as const },
  { date: "2026-03-26", label: "Retro", status: "danger" as const },
]

export default function CalendarBasic() {
  return (
    <Calendar
      month={MONTH}
      value="2026-03-19"
      events={EVENTS}
      weekStartsOn={1}
    />
  )
}
