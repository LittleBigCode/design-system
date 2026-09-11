import * as React from "react"

import { MultiSelect } from "@diametral/design-system/react"

const OWNERS = [
  { value: "amorval", label: "Augustin Morval" },
  { value: "lreveil", label: "Léa Réveil" },
  { value: "tnguyen", label: "Thi Nguyen" },
]

const TICKETS = [
  { id: "DS-114", title: "Token drift check", owner: "amorval" },
  { id: "DS-118", title: "Sidebar keyboard trap", owner: "lreveil" },
  { id: "DS-121", title: "Chart legend contrast", owner: "tnguyen" },
  { id: "DS-124", title: "Publish dry run", owner: "amorval" },
]

export default function MultiSelectFilterBar() {
  const [owners, setOwners] = React.useState<string[]>([])

  const tickets = owners.length
    ? TICKETS.filter((ticket) => owners.includes(ticket.owner))
    : TICKETS

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <MultiSelect
        options={OWNERS}
        value={owners}
        onValueChange={setOwners}
        placeholder="All owners"
        aria-label="Filter tickets by owner"
      />
      <ul className="divide-y text-sm">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="flex gap-3 py-2">
            <span className="text-muted-foreground tabular-nums">
              {ticket.id}
            </span>
            <span>{ticket.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
