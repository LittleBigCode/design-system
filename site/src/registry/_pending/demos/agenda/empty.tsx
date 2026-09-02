import { Agenda } from "@diametral/ui/components/agenda"

export default function AgendaEmpty() {
  return (
    <Agenda
      events={[]}
      emptyMessage="Nothing scheduled this week."
      className="max-w-md"
    />
  )
}
