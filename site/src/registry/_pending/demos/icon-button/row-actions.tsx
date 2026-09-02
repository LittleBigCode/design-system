import { ArchiveIcon, TrashIcon } from "@phosphor-icons/react"

import { IconButton } from "@diametral/ui/components/icon-button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@diametral/ui/components/table"

const INVOICES = [
  { ref: "INV-2481", client: "Ateliers Perrin", total: "4 200 €" },
  { ref: "INV-2482", client: "Groupe Lemaire", total: "11 850 €" },
  { ref: "INV-2483", client: "Studio Vance", total: "2 340 €" },
]

export default function IconButtonRowActions() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reference</TableHead>
          <TableHead>Client</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="w-24" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {INVOICES.map((invoice) => (
          <TableRow key={invoice.ref}>
            <TableCell className="font-medium">{invoice.ref}</TableCell>
            <TableCell>{invoice.client}</TableCell>
            <TableCell className="text-right tabular-nums">
              {invoice.total}
            </TableCell>
            <TableCell className="text-right">
              <IconButton
                label={`Archive ${invoice.ref}`}
                variant="ghost"
                size="icon-sm"
              >
                <ArchiveIcon />
              </IconButton>
              <IconButton
                label={`Delete ${invoice.ref}`}
                variant="ghost"
                size="icon-sm"
              >
                <TrashIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
