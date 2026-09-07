import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@diametral/design-system/react"

const COLUMNS = [
  { head: "Invoice", width: "4rem" },
  { head: "Client", width: "8rem" },
  { head: "Amount", width: "3rem" },
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
                <Skeleton
                  className="ds-skeleton--text"
                  style={{ width: column.width }}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
