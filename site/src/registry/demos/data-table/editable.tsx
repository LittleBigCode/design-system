import { useState } from "react"

import { DataTable, type ColumnDef } from "@diametral/design-system/react"

type Budget = {
  id: string
  team: string
  owner: string
  cap: number
}

const COLUMNS: ColumnDef<Budget>[] = [
  { accessorKey: "team", header: "Team" },
  { accessorKey: "owner", header: "Owner", meta: { editable: true } },
  {
    accessorKey: "cap",
    header: "Monthly cap",
    meta: { editable: true },
  },
]

const INITIAL: Budget[] = [
  { id: "b-1", team: "Ingestion", owner: "A. Roussel", cap: 4200 },
  { id: "b-2", team: "Warehouse", owner: "M. Diallo", cap: 7800 },
  { id: "b-3", team: "Reporting", owner: "K. Novak", cap: 3100 },
]

export default function DataTableEditable() {
  const [rows, setRows] = useState(INITIAL)

  return (
    <DataTable
      columns={COLUMNS}
      data={rows}
      rowKey={(row) => row.id}
      editable
      onCellEdit={(row, key, value) =>
        setRows((all) =>
          all.map((r) => (r.id === row.id ? { ...r, [key]: value } : r))
        )
      }
    />
  )
}
