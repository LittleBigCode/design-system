import { BulletChart } from "@diametral/ui/components/bullet-chart"
import { DataTable, type ColumnDef } from "@diametral/ui/components/data-table"

type Rep = { name: string; closed: number; quota: number }

const REPS: Rep[] = [
  { name: "Amélie Roux", closed: 412, quota: 380 },
  { name: "Tomás Vieira", closed: 268, quota: 380 },
  { name: "Sanne de Vries", closed: 351, quota: 320 },
  { name: "Jonas Berger", closed: 194, quota: 320 },
]

const COLUMNS: ColumnDef<Rep>[] = [
  { accessorKey: "name", header: "Rep" },
  {
    id: "attainment",
    header: "Attainment",
    cell: ({ row }) => (
      <BulletChart
        value={row.original.closed}
        target={row.original.quota}
        max={480}
        aria-label={`${row.original.name} attainment`}
        formatValue={(figure) => `€${figure}k`}
        className="min-w-56 [--bullet-label:0rem] [--bullet-value:3.5rem]"
      />
    ),
  },
]

export default function BulletChartInTable() {
  return <DataTable columns={COLUMNS} data={REPS} />
}
