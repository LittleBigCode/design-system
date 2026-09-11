import { DataTable, type ColumnDef } from "@diametral/design-system/react"

type Commit = {
  sha: string
  message: string
  author: string
}

const AUTHORS = ["amorval", "croy", "nlefevre"]

const ALL: Commit[] = Array.from({ length: 34 }, (_, index) => ({
  sha: (0x8a5ffb3 + index * 7919).toString(16).slice(0, 7),
  message: `Refine the ${["registry", "playground", "coverage gate", "tokens"][index % 4]} pass ${index + 1}`,
  author: AUTHORS[index % AUTHORS.length],
}))

const COLUMNS: ColumnDef<Commit>[] = [
  { accessorKey: "sha", header: "Commit" },
  { accessorKey: "message", header: "Message" },
  { accessorKey: "author", header: "Author" },
]

async function loadPage({
  page,
  pageSize,
}: {
  page: number
  pageSize: number
}) {
  await new Promise((resolve) => setTimeout(resolve, 400))
  const start = (page - 1) * pageSize
  return { rows: ALL.slice(start, start + pageSize), total: ALL.length }
}

export default function DataTableInfinite() {
  return (
    <DataTable
      columns={COLUMNS}
      rowKey={(row) => row.sha}
      pageSize={10}
      lazyMode="infinite"
      loadPage={loadPage}
      loadMoreLabel="Load 10 more"
    />
  )
}
