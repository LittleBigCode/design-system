import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@diametral/ui/components/table"

const LINES = [
  { label: "Design system audit", days: 6, amount: 5400 },
  { label: "Token migration", days: 3, amount: 2700 },
  { label: "Component documentation", days: 4, amount: 3600 },
]

const total = LINES.reduce((sum, line) => sum + line.amount, 0)

export default function TableWithFooter() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Line item</TableHead>
          <TableHead className="text-right">Days</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {LINES.map((line) => (
          <TableRow key={line.label}>
            <TableCell>{line.label}</TableCell>
            <TableCell className="text-right tabular-nums">
              {line.days}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              €{line.amount.toLocaleString("fr-FR")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right tabular-nums">
            {LINES.reduce((sum, line) => sum + line.days, 0)}
          </TableCell>
          <TableCell className="text-right tabular-nums">
            €{total.toLocaleString("fr-FR")}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
