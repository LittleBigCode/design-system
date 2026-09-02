import { Skeleton } from "@diametral/ui/components/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@diametral/ui/components/table"

const COLUMNS = [
  { head: "Invoice", bar: "h-3 w-16" },
  { head: "Client", bar: "h-3 w-32" },
  { head: "Amount", bar: "h-3 w-12" },
]

export default function SkeletonTableRows() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {COLUMNS.map((column) => (
            <TableHead key={column.head}>{column.head}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {["a", "b", "c", "d"].map((row) => (
          <TableRow key={row}>
            {COLUMNS.map((column) => (
              <TableCell key={column.head}>
                <Skeleton className={column.bar} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
