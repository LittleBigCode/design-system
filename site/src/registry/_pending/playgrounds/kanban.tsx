import type { ComponentProps } from "react"

import {
  Kanban,
  KanbanCardTitle,
  type KanbanColumn,
} from "@diametral/ui/components/kanban"

type Ticket = { id: string; column: string; title: string }

const COLUMNS: KanbanColumn[] = [
  { id: "backlog", title: "Backlog" },
  { id: "progress", title: "In progress" },
  { id: "shipped", title: "Shipped" },
]

const TICKETS: Ticket[] = [
  { id: "tokens", column: "backlog", title: "Tokenise the motion scale" },
  { id: "grip", column: "progress", title: "Add the card grip" },
]

// The board is configured through arrays and a render prop, and its card list is
// state it owns — so there is nothing for a control panel to drive. The panel is
// empty on purpose; drag a card, or tab to a grip and use the arrow keys.
export default function KanbanPlayground(
  props: Omit<
    ComponentProps<typeof Kanban>,
    "columns" | "items" | "defaultItems" | "renderCard"
  >
) {
  return (
    <Kanban
      {...props}
      columns={COLUMNS}
      defaultItems={TICKETS}
      renderCard={(ticket: Ticket) => (
        <KanbanCardTitle>{ticket.title}</KanbanCardTitle>
      )}
    />
  )
}
