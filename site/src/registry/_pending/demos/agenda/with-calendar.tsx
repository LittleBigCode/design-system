import { useState } from "react"

import { Agenda } from "@diametral/ui/components/agenda"
import { Calendar } from "@diametral/ui/components/calendar"

const EVENTS = [
  {
    date: "2026-08-11",
    time: "09:30",
    title: "Design system review",
    status: "info" as const,
  },
  {
    date: "2026-08-11",
    time: "14:00",
    title: "Client walkthrough",
    status: "success" as const,
  },
  {
    date: "2026-08-12",
    time: "11:00",
    title: "Quarterly planning",
  },
]

const sameDay = (a: Date, b: string) =>
  b ===
  `${a.getFullYear()}-${String(a.getMonth() + 1).padStart(2, "0")}-${String(a.getDate()).padStart(2, "0")}`

export default function AgendaWithCalendar() {
  const [day, setDay] = useState<Date | undefined>(new Date(2026, 7, 11))

  return (
    <div className="flex flex-wrap items-start gap-6">
      <Calendar
        mode="single"
        selected={day}
        onSelect={setDay}
        defaultMonth={new Date(2026, 7, 1)}
      />
      <Agenda
        events={day ? EVENTS.filter((event) => sameDay(day, event.date)) : []}
        emptyMessage="Nothing on this day."
        className="min-w-64 flex-1"
      />
    </div>
  )
}
