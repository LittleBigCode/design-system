import type { CSSProperties } from "react"

import {
  BulletChart,
  DataTable,
  type ColumnDef,
} from "@diametral/design-system/react"

type Rep = { name: string; closed: number; quota: number }

const REPS: Rep[] = [
  { name: "Amélie Roux", closed: 412, quota: 380 },
  { name: "Tomás Vieira", closed: 268, quota: 380 },
  { name: "Sanne de Vries", closed: 351, quota: 320 },
  { name: "Jonas Berger", closed: 194, quota: 320 },
]

/* Collapsing `--ds-bullet-label` to zero drops the label column, because the
   table's own column already names the row — which is also why `aria-label`
   has to supply the accessible name: with no visible label there is nothing
   to derive one from. */
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
        className="min-w-56"
        style={
          {
            "--ds-bullet-label": "0rem",
            "--ds-bullet-value": "3.5rem",
          } as CSSProperties
        }
      />
    ),
  },
]

export default function BulletChartInTable() {
  return <DataTable columns={COLUMNS} data={REPS} rowKey={(row) => row.name} />
}
