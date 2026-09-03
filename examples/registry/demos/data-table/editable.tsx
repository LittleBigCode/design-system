import { useState } from "react"

import { DataGrid } from "@diametral/design-system/react"

type Budget = {
  id: string
  team: string
  owner: string
  cap: number
}

const COLUMNS = [
  { key: "team", header: "Team", sortable: true },
  { key: "owner", header: "Owner", editable: true },
  {
    key: "cap",
    header: "Monthly cap",
    align: "right" as const,
    sortable: true,
    editable: true,
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
    <DataGrid
      columns={COLUMNS}
      rows={rows}
      rowKey={(row: Budget) => row.id}
      editable
      onCellEdit={(row: Budget, key: string, value: string) =>
        setRows((all) =>
          all.map((r) => (r.id === row.id ? { ...r, [key]: value } : r))
        )
      }
    />
  )
}
