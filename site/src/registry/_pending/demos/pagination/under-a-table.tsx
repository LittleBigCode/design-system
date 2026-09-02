import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@diametral/ui/components/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@diametral/ui/components/table"

const INVOICES = [
  { reference: "FA-2044", client: "Atelier Bosco", total: "1 240,00 €" },
  { reference: "FA-2043", client: "Verrerie Talon", total: "486,50 €" },
  { reference: "FA-2042", client: "Menuiserie Da Costa", total: "3 910,00 €" },
  { reference: "FA-2041", client: "Studio Kerbaol", total: "725,00 €" },
]

export default function PaginationUnderATable() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="text-end">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {INVOICES.map((invoice) => (
            <TableRow key={invoice.reference}>
              <TableCell className="font-medium">{invoice.reference}</TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell className="text-end tabular-nums">
                {invoice.total}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Showing 1–4 of 118 invoices
        </p>
        <Pagination className="mx-0 w-auto justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#invoices" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#invoices" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#invoices">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#invoices">30</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#invoices" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
