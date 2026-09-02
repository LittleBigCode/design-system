import { Agenda } from "@diametral/ui/components/agenda"

const EVENTS = [
  {
    date: "2026-08-11",
    time: "09:30",
    title: "Design system review",
    meta: "Salle Perrin · 6 people",
    status: "info" as const,
  },
  {
    date: "2026-08-11",
    time: "14:00",
    title: "Client walkthrough — Groupe Lemaire",
    meta: "Remote",
    status: "success" as const,
  },
  {
    date: "2026-08-12",
    time: "11:00",
    title: "Quarterly planning",
    meta: "All hands",
  },
  {
    date: "2026-08-12",
    time: "16:30",
    title: "Contract renewal deadline",
    status: "danger" as const,
  },
]

export default function AgendaBasic() {
  return <Agenda events={EVENTS} className="max-w-md" />
}
