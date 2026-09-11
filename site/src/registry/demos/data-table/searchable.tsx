import { Badge, DataTable, type ColumnDef } from "@diametral/design-system/react"

type Invoice = { id: string; client: string; status: string; amount: number }

const INVOICES: Invoice[] = [
  { id: "INV-001", client: "Atelier Nord", status: "Paid", amount: 1250 },
  { id: "INV-002", client: "Studio Rive", status: "Pending", amount: 380 },
  { id: "INV-003", client: "Groupe Lumen", status: "Overdue", amount: 2100 },
  { id: "INV-004", client: "Maison Clave", status: "Paid", amount: 940 },
  { id: "INV-005", client: "Atelier Nord", status: "Pending", amount: 610 },
]

const COLUMNS: ColumnDef<Invoice>[] = [
  { accessorKey: "id", header: "Invoice" },
  { accessorKey: "client", header: "Client" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status")
      return (
        <Badge
          variant={
            status === "Paid"
              ? "secondary"
              : status === "Overdue"
                ? "destructive"
                : "outline"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="tabular-nums">
        €{row.getValue<number>("amount").toLocaleString("fr-FR")}
      </span>
    ),
  },
]

export default function DataTableSearchable() {
  return (
    <DataTable
      columns={COLUMNS}
      data={INVOICES}
      pageSize={3}
      searchColumn="client"
      searchPlaceholder="Filter clients"
    />
  )
}
