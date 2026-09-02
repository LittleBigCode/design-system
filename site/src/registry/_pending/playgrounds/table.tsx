import type { ComponentProps } from "react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@diametral/ui/components/table"

const ROWS = [
  { id: "INV-001", client: "Régie Ouest", total: "4 200 €" },
  { id: "INV-002", client: "Atelier Nord", total: "1 850 €" },
]

// The table parts are plain elements with no variant axis. The one state that
// changes anything is `data-state="selected"` on a row, so that is the subject.
export default function TablePlayground(
  props: ComponentProps<typeof TableRow>
) {
  return (
    <Table>
      <TableCaption>Recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Client</TableHead>
          <TableHead className="text-end">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow {...props}>
          <TableCell className="font-mono text-xs">{ROWS[0]!.id}</TableCell>
          <TableCell>{ROWS[0]!.client}</TableCell>
          <TableCell className="text-end">{ROWS[0]!.total}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono text-xs">{ROWS[1]!.id}</TableCell>
          <TableCell>{ROWS[1]!.client}</TableCell>
          <TableCell className="text-end">{ROWS[1]!.total}</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-end">6 050 €</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
