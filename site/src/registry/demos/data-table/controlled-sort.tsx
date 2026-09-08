import { useState } from "react"

import { Button, DataTable, type ColumnDef } from "@diametral/design-system/react"

type Run = {
  id: string
  suite: string
  failures: number
  duration: number
}

const DATA: Run[] = [
  { id: "r-1", suite: "auth", failures: 0, duration: 42 },
  { id: "r-2", suite: "billing", failures: 3, duration: 128 },
  { id: "r-3", suite: "search", failures: 1, duration: 311 },
  { id: "r-4", suite: "webhooks", failures: 0, duration: 87 },
]

const COLUMNS: ColumnDef<Run>[] = [
  { accessorKey: "suite", header: "Suite" },
  { accessorKey: "failures", header: "Failures" },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <span className="tabular-nums">{row.original.duration}s</span>
    ),
  },
]

export default function DataTableControlledSort() {
  const [sort, setSort] = useState([{ id: "failures", desc: true }])

  return (
    <div className="flex w-full flex-col gap-3">
      <DataTable
        columns={COLUMNS}
        data={DATA}
        rowKey={(row) => row.id}
        sort={sort}
        onSortChange={setSort}
      />
      <div className="flex items-center gap-3">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSort([{ id: "duration", desc: true }])}
        >
          Sort by slowest
        </Button>
        <span className="text-sm text-muted-foreground">
          {sort.length
            ? `${sort[0].id} ${sort[0].desc ? "descending" : "ascending"}`
            : "Unsorted"}
        </span>
      </div>
    </div>
  )
}
