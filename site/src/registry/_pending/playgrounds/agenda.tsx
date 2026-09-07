import type { ComponentProps } from "react"

import { Agenda } from "@diametral/ui/components/agenda"

const EVENTS = [
  {
    date: "2026-08-11",
    time: "09:30",
    title: "Design system review",
    meta: "Salle Perrin",
    status: "info" as const,
  },
  {
    date: "2026-08-12",
    time: "11:00",
    title: "Quarterly planning",
    status: "success" as const,
  },
]

// `events` carries nodes and Dates, so the list is fixed here.
export default function AgendaPlayground({
  locale,
  ...rest
}: Partial<ComponentProps<typeof Agenda>>) {
  const props = {
    ...rest,
    // The panel's first option is the em dash, meaning "follow the browser".
    ...(locale && locale !== "—" ? { locale } : {}),
  }

  return <Agenda events={EVENTS} className="max-w-md" {...props} />
}
