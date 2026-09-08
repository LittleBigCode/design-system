import {
  Badge,
  DataTable,
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
  type ColumnDef,
} from "@diametral/design-system/react"

type Deploy = {
  id: string
  service: string
  env: string
  duration: string
  commit: string
  author: string
  notes?: string
}

const DATA: Deploy[] = [
  {
    id: "d-4812",
    service: "auth-api",
    env: "production",
    duration: "3m 41s",
    commit: "8a5ffb3",
    author: "Augustin Morval",
    notes: "Rotated the session signing key ahead of the audit.",
  },
  {
    id: "d-4813",
    service: "billing",
    env: "staging",
    duration: "1m 12s",
    commit: "bd9b2df",
    author: "Camille Roy",
  },
  {
    id: "d-4814",
    service: "search",
    env: "production",
    duration: "6m 02s",
    commit: "e290fdf",
    author: "Nadia Lefevre",
    notes: "Index rebuild ran inline; expect a slow first query.",
  },
]

const COLUMNS: ColumnDef<Deploy>[] = [
  { accessorKey: "service", header: "Service" },
  {
    accessorKey: "env",
    header: "Environment",
    cell: ({ row }) => <Badge>{row.original.env}</Badge>,
  },
  { accessorKey: "duration", header: "Duration" },
]

export default function DataTableExpandable() {
  return (
    <DataTable
      columns={COLUMNS}
      data={DATA}
      rowKey={(row) => row.id}
      expandable
      detailLabel={(row) => `Show detail for ${row.service}`}
      renderDetail={(row) => (
        <DescriptionList className="max-w-md">
          <DescriptionTerm>Commit</DescriptionTerm>
          <DescriptionDetail>{row.commit}</DescriptionDetail>
          <DescriptionTerm>Author</DescriptionTerm>
          <DescriptionDetail>{row.author}</DescriptionDetail>
          <DescriptionTerm>Notes</DescriptionTerm>
          <DescriptionDetail>{row.notes ?? "None"}</DescriptionDetail>
        </DescriptionList>
      )}
    />
  )
}
