import { Badge } from "@diametral/ui/components/badge"
import {
  Kanban,
  KanbanCardTitle,
  type KanbanColumn,
} from "@diametral/ui/components/kanban"

const COLUMNS: KanbanColumn[] = [
  { id: "backlog", title: "Backlog" },
  { id: "active", title: "Active" },
  { id: "review", title: "Review" },
]

type Ticket = {
  id: string
  column: string
  title: string
  owner: string
  priority: string
}

const TICKETS: Ticket[] = [
  {
    id: "DS-412",
    column: "backlog",
    title: "Tokenise the motion scale",
    owner: "Augustin",
    priority: "P2",
  },
  {
    id: "DS-408",
    column: "active",
    title: "Wrapper components must forward aria-label",
    owner: "Priya",
    priority: "P0",
  },
  {
    id: "DS-401",
    column: "review",
    title: "Publish-ready packaging invariants",
    owner: "Sam",
    priority: "P1",
  },
]

export default function KanbanCardContent() {
  return (
    <Kanban
      columns={COLUMNS}
      defaultItems={TICKETS}
      className="max-w-3xl"
      renderCard={(ticket) => (
        <div className="flex flex-col gap-1.5">
          <KanbanCardTitle>{ticket.title}</KanbanCardTitle>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">
              {ticket.owner}
            </span>
            <Badge variant="secondary">{ticket.priority}</Badge>
          </div>
        </div>
      )}
    />
  )
}
