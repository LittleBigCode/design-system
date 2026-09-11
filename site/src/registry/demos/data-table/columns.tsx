import { Button, DataTable, type ColumnDef } from "@diametral/design-system/react"

type Row = {
  id: string
  service: string
  owner: string
  region: string
  requests: number
  errors: number
}

const DATA: Row[] = [
  {
    id: "s-1",
    service: "auth-api",
    owner: "Platform",
    region: "eu-west-3",
    requests: 182_400,
    errors: 12,
  },
  {
    id: "s-2",
    service: "billing",
    owner: "Revenue",
    region: "eu-west-1",
    requests: 41_200,
    errors: 3,
  },
  {
    id: "s-3",
    service: "search",
    owner: "Data",
    region: "eu-central-1",
    requests: 96_800,
    errors: 41,
  },
]

const COLUMNS: ColumnDef<Row>[] = [
  { accessorKey: "service", header: "Service" },
  { accessorKey: "owner", header: "Owner" },
  { accessorKey: "region", header: "Region", meta: { hidden: true } },
  {
    accessorKey: "requests",
    header: "Requests",
    cell: ({ row }) => (
      <span className="tabular-nums">
        {row.original.requests.toLocaleString("fr-FR")}
      </span>
    ),
  },
  { accessorKey: "errors", header: "Errors" },
]

export default function DataTableColumns() {
  return (
    <DataTable
      columns={COLUMNS}
      data={DATA}
      rowKey={(row) => row.id}
      title="Services"
      columnToggle
      reorderable
      toolbar={
        <Button size="sm" variant="outline">
          Export
        </Button>
      }
    />
  )
}
