import { DataTable, type ColumnDef } from "@diametral/design-system/react"

type Run = {
  id: string
  pipeline: string
  duration: number
  rows: number
}

const COLUMNS: ColumnDef<Run>[] = [
  { accessorKey: "pipeline", header: "Pipeline" },
  { accessorKey: "id", header: "Run", enableSorting: false },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <span className="tabular-nums">{row.original.duration}s</span>
    ),
  },
  {
    accessorKey: "rows",
    header: "Rows",
    cell: ({ row }) => (
      <span className="tabular-nums">
        {row.original.rows.toLocaleString("en-GB")}
      </span>
    ),
  },
]

const DATA: Run[] = [
  { id: "r-4812", pipeline: "ingest-crm", duration: 42, rows: 128_402 },
  { id: "r-4811", pipeline: "ingest-billing", duration: 17, rows: 9_881 },
  { id: "r-4810", pipeline: "rollup-daily", duration: 311, rows: 2_004_117 },
  { id: "r-4809", pipeline: "ingest-crm", duration: 39, rows: 127_990 },
  { id: "r-4808", pipeline: "export-warehouse", duration: 88, rows: 441_002 },
]

export default function DataTableBasic() {
  return (
    <DataTable
      columns={COLUMNS}
      data={DATA}
      rowKey={(row) => row.id}
      selectable
      defaultSort={[{ id: "rows", desc: true }]}
    />
  )
}
