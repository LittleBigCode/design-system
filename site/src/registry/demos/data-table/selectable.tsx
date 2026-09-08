import { useState } from "react"

import { Button, DataTable, type ColumnDef } from "@diametral/design-system/react"

type Invoice = {
  ref: string
  client: string
  amount: number
  status: string
}

const DATA: Invoice[] = [
  { ref: "INV-2481", client: "Ateliers Perrin", amount: 4200, status: "Paid" },
  { ref: "INV-2482", client: "Groupe Lemaire", amount: 11850, status: "Sent" },
  { ref: "INV-2483", client: "Studio Vance", amount: 2340, status: "Overdue" },
  { ref: "INV-2484", client: "Maison Baril", amount: 7600, status: "Draft" },
]

const COLUMNS: ColumnDef<Invoice>[] = [
  { accessorKey: "ref", header: "Reference" },
  { accessorKey: "client", header: "Client" },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="tabular-nums">
        {row.original.amount.toLocaleString("fr-FR")} €
      </span>
    ),
  },
]

export default function DataTableSelectable() {
  const [selected, setSelected] = useState<string[]>(["INV-2482"])

  return (
    <div className="flex w-full flex-col gap-3">
      <DataTable
        columns={COLUMNS}
        data={DATA}
        selectable
        rowKey={(row) => row.ref}
        rowLabel={(row) => `Select ${row.ref}`}
        selectedKeys={selected}
        onSelectionChange={setSelected}
      />
      <div className="flex items-center gap-3">
        <Button size="sm" variant="outline" disabled={!selected.length}>
          Send {selected.length || "no"} reminder
          {selected.length === 1 ? "" : "s"}
        </Button>
        <span className="text-sm text-muted-foreground">
          {selected.length ? selected.join(", ") : "Nothing selected"}
        </span>
      </div>
    </div>
  )
}
