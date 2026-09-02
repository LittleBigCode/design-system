import { IconButton } from "@diametral/design-system/react"
import { ArchiveIcon, TrashIcon } from "@phosphor-icons/react"

const INVOICES = [
  { ref: "INV-2481", client: "Ateliers Perrin", total: "4 200 €" },
  { ref: "INV-2482", client: "Groupe Lemaire", total: "11 850 €" },
  { ref: "INV-2483", client: "Studio Vance", total: "2 340 €" },
]

/* The case IconButton exists for: an action repeated down every row, where a
   worded button would be three words of noise per line. `size="icon-sm"` is
   the 30px square that fits a table row, and `label` is what makes each one
   distinguishable to a screen reader — "Archive INV-2481", not "Archive" three
   times over.

   Plain table markup rather than the source's Table parts: `.ds-table` is this
   package's class contract and the compound Table lands in batch 6. */
export default function IconButtonRowActions() {
  return (
    <table className="ds-table w-full max-w-lg">
      <thead>
        <tr>
          <th scope="col">Reference</th>
          <th scope="col">Client</th>
          <th scope="col" className="text-right">
            Total
          </th>
          <th scope="col" className="w-24">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {INVOICES.map((invoice) => (
          <tr key={invoice.ref}>
            <td className="font-medium">{invoice.ref}</td>
            <td>{invoice.client}</td>
            <td className="text-right tabular-nums">{invoice.total}</td>
            <td className="text-right">
              <IconButton label={`Archive ${invoice.ref}`} size="icon-sm">
                <ArchiveIcon />
              </IconButton>
              <IconButton label={`Delete ${invoice.ref}`} size="icon-sm">
                <TrashIcon />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
