import { Sparkline } from "@diametral/ui/components/sparkline"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@diametral/ui/components/table"

const SERVICES = [
  { name: "auth-api", p95: "82 ms", trend: [70, 74, 71, 78, 80, 76, 82] },
  {
    name: "billing",
    p95: "146 ms",
    trend: [180, 172, 165, 158, 151, 149, 146],
  },
  { name: "search", p95: "311 ms", trend: [210, 225, 244, 261, 280, 295, 311] },
  { name: "webhooks", p95: "64 ms", trend: [64, 64, 64, 64, 64, 64, 64] },
]

export default function SparklineTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service</TableHead>
          <TableHead>p95</TableHead>
          <TableHead className="text-right">7 days</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {SERVICES.map((service) => (
          <TableRow key={service.name}>
            <TableCell className="font-medium">{service.name}</TableCell>
            <TableCell className="tabular-nums">{service.p95}</TableCell>
            <TableCell className="text-right">
              <Sparkline
                data={service.trend}
                width={90}
                height={20}
                aria-label={`${service.name} p95 latency over 7 days`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
