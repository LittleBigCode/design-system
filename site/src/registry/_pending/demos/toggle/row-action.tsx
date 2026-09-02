import { PushPinIcon } from "@phosphor-icons/react"

import { Toggle } from "@diametral/ui/components/toggle"

const VIEWS = [
  { id: "overdue", label: "Overdue invoices", pinned: true },
  { id: "quarter", label: "This quarter", pinned: false },
  { id: "unassigned", label: "Unassigned", pinned: false },
]

export default function ToggleRowAction() {
  return (
    <ul className="w-full max-w-sm divide-y divide-border border border-border">
      {VIEWS.map((view) => (
        <li
          key={view.id}
          className="flex items-center justify-between gap-4 py-1.5 ps-3 pe-1.5"
        >
          <span className="text-sm">{view.label}</span>
          <Toggle
            size="sm"
            defaultPressed={view.pinned}
            aria-label={`Pin ${view.label}`}
          >
            <PushPinIcon />
          </Toggle>
        </li>
      ))}
    </ul>
  )
}
