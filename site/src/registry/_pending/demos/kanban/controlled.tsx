import * as React from "react"

import {
  Kanban,
  KanbanCardTitle,
  type KanbanColumn,
} from "@diametral/ui/components/kanban"

const COLUMNS: KanbanColumn[] = [
  { id: "todo", title: "To do" },
  { id: "review", title: "In review" },
  { id: "done", title: "Done" },
]

type Task = { id: string; column: string; title: string }

const TASKS: Task[] = [
  { id: "spec", column: "todo", title: "Write the migration spec" },
  { id: "tones", column: "review", title: "Audit the tone inks for AA" },
  { id: "gate", column: "done", title: "Wire the a11y gate into CI" },
]

export default function KanbanControlled() {
  const [tasks, setTasks] = React.useState(TASKS)
  const [lastMove, setLastMove] = React.useState<string>()

  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <Kanban
        columns={COLUMNS}
        items={tasks}
        onItemsChange={setTasks}
        onMove={(key, toColumnId) => setLastMove(`${key} → ${toColumnId}`)}
        renderCard={(task) => <KanbanCardTitle>{task.title}</KanbanCardTitle>}
      />
      <p className="text-xs text-muted-foreground tabular-nums">
        {lastMove ? `Last move: ${lastMove}` : "No moves yet."}
      </p>
    </div>
  )
}
