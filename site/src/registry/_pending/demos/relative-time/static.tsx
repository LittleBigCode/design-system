import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@diametral/ui/components/table"
import { RelativeTime } from "@diametral/ui/components/relative-time"

const ROWS = [
  { id: "INV-041", updated: new Date(Date.now() - 5 * 60_000) },
  { id: "INV-040", updated: new Date(Date.now() - 26 * 3_600_000) },
]

export default function RelativeTimeStatic() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ROWS.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-mono text-xs">{row.id}</TableCell>
            <TableCell>
              <RelativeTime date={row.updated} live={false} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
