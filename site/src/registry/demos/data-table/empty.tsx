import { DataTable, type ColumnDef } from "@diametral/design-system/react"

type Alert = { rule: string; severity: string; raised: string }

const ALERTS: Alert[] = []

const COLUMNS: ColumnDef<Alert>[] = [
  { accessorKey: "rule", header: "Rule" },
  { accessorKey: "severity", header: "Severity" },
  { accessorKey: "raised", header: "Raised" },
]

export default function DataTableEmpty() {
  return (
    <DataTable
      columns={COLUMNS}
      data={ALERTS}
      searchColumn="rule"
      searchPlaceholder="Filter rules"
      emptyMessage="No alerts in the last 24 hours."
    />
  )
}
