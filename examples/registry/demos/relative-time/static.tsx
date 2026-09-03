import { RelativeTime } from "@diametral/design-system/react"

const ROWS = [
  { id: "INV-041", updated: new Date(Date.now() - 5 * 60_000) },
  { id: "INV-040", updated: new Date(Date.now() - 26 * 3_600_000) },
]

/* `live={false}` stops the timer. Reach for it wherever the component is
   repeated — a table of a hundred rows with a live timer each is a hundred
   chained timeouts, and a row that says "5 minutes ago" instead of "6" is not
   a defect anyone will notice. The `title` still carries the exact time.

   Plain table markup rather than the source's Table parts: `.ds-table` is this
   package's class contract and the compound Table lands in batch 6. */
export default function RelativeTimeStatic() {
  return (
    <table className="ds-table w-full max-w-sm">
      <thead>
        <tr>
          <th scope="col">Invoice</th>
          <th scope="col">Updated</th>
        </tr>
      </thead>
      <tbody>
        {ROWS.map((row) => (
          <tr key={row.id}>
            <td className="font-mono text-xs">{row.id}</td>
            <td>
              <RelativeTime date={row.updated} live={false} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
