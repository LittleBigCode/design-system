import { DataGrid } from "@diametral/design-system/react"

type Run = {
  id: string
  pipeline: string
  duration: number
  rows: number
}

const COLUMNS = [
  { key: "pipeline", header: "Pipeline", sortable: true },
  { key: "id", header: "Run", width: "8rem" },
  {
    key: "duration",
    header: "Duration",
    align: "right" as const,
    sortable: true,
    render: (row: Run) => `${row.duration}s`,
  },
  {
    key: "rows",
    header: "Rows",
    align: "right" as const,
    sortable: true,
    render: (row: Run) => row.rows.toLocaleString("en-GB"),
  },
]

const ROWS: Run[] = [
  { id: "r-4812", pipeline: "ingest-crm", duration: 42, rows: 128_402 },
  { id: "r-4811", pipeline: "ingest-billing", duration: 17, rows: 9_881 },
  { id: "r-4810", pipeline: "rollup-daily", duration: 311, rows: 2_004_117 },
  { id: "r-4809", pipeline: "ingest-crm", duration: 39, rows: 127_990 },
  { id: "r-4808", pipeline: "export-warehouse", duration: 88, rows: 441_002 },
]

export default function DataTableBasic() {
  return (
    <DataGrid
      columns={COLUMNS}
      rows={ROWS}
      rowKey={(row: Run) => row.id}
      selectable
      defaultSort={{ key: "rows", dir: "desc" }}
    />
  )
}
