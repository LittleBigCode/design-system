import { Agenda } from "@diametral/design-system/react"
export default function AgendaEmpty() {
  return (
    <Agenda
      events={[]}
      emptyMessage="Nothing scheduled this week."
      className="max-w-md"
    />
  )
}
