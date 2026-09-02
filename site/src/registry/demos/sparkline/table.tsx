import { Sparkline } from "@diametral/design-system/react"

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

/* `Table`'s React parts are batch 6; the incumbent `.ds-table` classes are the
   whole contract until then, and a real <table> is what a sparkline in a cell
   has to sit in anyway. Each row's sparkline carries its own `aria-label`,
   because here the trend is the cell's only content — nothing else in the row
   says which way latency went.

   `webhooks` is the flat series: every point equal, pinned to the middle of the
   box rather than drawn along the floor. */
export default function SparklineTable() {
  return (
    <table className="ds-table ds-table--hover">
      <thead>
        <tr>
          <th>Service</th>
          <th className="ds-table__num">p95</th>
          <th className="ds-table__num">7 days</th>
        </tr>
      </thead>
      <tbody>
        {SERVICES.map((service) => (
          <tr key={service.name}>
            <td className="ds-table__name">{service.name}</td>
            <td className="ds-table__num">{service.p95}</td>
            <td className="ds-table__num">
              <Sparkline
                data={service.trend}
                width={90}
                height={20}
                aria-label={`${service.name} p95 latency over 7 days`}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
