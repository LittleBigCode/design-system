import type { CSSProperties } from "react"

import {
  BulletChart,
  DataGrid,
  type DataGridColumn,
} from "@diametral/design-system/react"

type Rep = { name: string; closed: number; quota: number }

const REPS: Rep[] = [
  { name: "Amélie Roux", closed: 412, quota: 380 },
  { name: "Tomás Vieira", closed: 268, quota: 380 },
  { name: "Sanne de Vries", closed: 351, quota: 320 },
  { name: "Jonas Berger", closed: 194, quota: 320 },
]

/* `DataTable` is the source's name for this; here the grid is `DataGrid`, whose
   columns carry a `render` rather than a `cell` and are keyed by `key`.

   Collapsing `--ds-bullet-label` to zero drops the label column, because the
   table's own column already names the row — which is also why `aria-label` has
   to supply the accessible name: with no visible label there is nothing to
   derive one from. */
const COLUMNS: DataGridColumn<Rep>[] = [
  { key: "name", header: "Rep" },
  {
    key: "attainment",
    header: "Attainment",
    render: (row) => (
      <BulletChart
        value={row.closed}
        target={row.quota}
        max={480}
        aria-label={`${row.name} attainment`}
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
  return <DataGrid columns={COLUMNS} rows={REPS} rowKey={(row) => row.name} />
}
