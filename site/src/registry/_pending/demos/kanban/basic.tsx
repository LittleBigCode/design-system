import { Kanban, type KanbanColumn } from "@diametral/ui/components/kanban"

const COLUMNS: KanbanColumn[] = [
  { id: "triage", title: "Triage" },
  { id: "building", title: "Building" },
  { id: "shipped", title: "Shipped" },
]

const ISSUES = [
  { id: "88", column: "triage", title: "Restore the chart animations" },
  { id: "77", column: "triage", title: "Decide on the application shell" },
  { id: "75", column: "building", title: "Add a board component" },
]

export default function KanbanBasic() {
  return (
    <Kanban columns={COLUMNS} defaultItems={ISSUES} className="max-w-3xl" />
  )
}
