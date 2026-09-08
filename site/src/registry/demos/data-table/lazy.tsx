import { DataTable, type ColumnDef } from "@diametral/design-system/react"

type Event = {
  id: number
  actor: string
  action: string
  at: string
}

const ACTORS = ["Augustin Morval", "Camille Roy", "Nadia Lefevre", "Théo Baril"]
const ACTIONS = ["signed in", "exported a report", "invited a member"]

const ALL: Event[] = Array.from({ length: 47 }, (_, index) => ({
  id: 1000 + index,
  actor: ACTORS[index % ACTORS.length],
  action: ACTIONS[index % ACTIONS.length],
  at: `2026-08-${String(1 + (index % 28)).padStart(2, "0")} 09:${String(index % 60).padStart(2, "0")}`,
}))

const COLUMNS: ColumnDef<Event>[] = [
  { accessorKey: "id", header: "Event" },
  { accessorKey: "actor", header: "Actor" },
  { accessorKey: "action", header: "Action" },
  { accessorKey: "at", header: "When" },
]

async function loadPage({
  page,
  pageSize,
  sort,
}: {
  page: number
  pageSize: number
  sort: { id: string; desc: boolean }[]
}) {
  await new Promise((resolve) => setTimeout(resolve, 400))
  const rows = [...ALL]
  const [order] = sort
  if (order) {
    rows.sort((a, b) => {
      const left = String(a[order.id as keyof Event])
      const right = String(b[order.id as keyof Event])
      return order.desc ? right.localeCompare(left) : left.localeCompare(right)
    })
  }
  const start = (page - 1) * pageSize
  return { rows: rows.slice(start, start + pageSize), total: ALL.length }
}

export default function DataTableLazy() {
  return (
    <DataTable
      columns={COLUMNS}
      rowKey={(row) => String(row.id)}
      pageSize={8}
      loadPage={loadPage}
    />
  )
}
