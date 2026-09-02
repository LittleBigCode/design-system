import { Editable } from "@diametral/ui/components/editable"

const COLUMNS = [
  { id: "backlog", name: "Backlog", count: 18 },
  { id: "in-progress", name: "In progress", count: 5 },
  { id: "review", name: "In review", count: 3 },
  { id: "staging", name: "", count: 0 },
]

export default function EditableRows() {
  return (
    <ul className="w-full max-w-sm">
      {COLUMNS.map((column) => (
        <li
          key={column.id}
          className="flex items-center justify-between gap-2 border-b py-2"
        >
          <Editable defaultValue={column.name} placeholder="Name this column" />
          <span className="text-sm text-muted-foreground tabular-nums">
            {column.count} cards
          </span>
        </li>
      ))}
    </ul>
  )
}
