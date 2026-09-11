import { DotsThreeIcon } from "@phosphor-icons/react"

import {
  Button,
  DataTable,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  type ColumnDef,
} from "@diametral/design-system/react"

type Member = { email: string; role: string; joined: string }

const MEMBERS: Member[] = [
  { email: "camille@diametral.fr", role: "Owner", joined: "12 Jan 2025" },
  { email: "nadia@diametral.fr", role: "Editor", joined: "03 Mar 2025" },
  { email: "theo@diametral.fr", role: "Viewer", joined: "28 Jun 2025" },
]

const COLUMNS: ColumnDef<Member>[] = [
  { accessorKey: "email", header: "Member" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "joined", header: "Joined" },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Actions for ${row.original.email}`}
            />
          }
        >
          <DotsThreeIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Change role</DropdownMenuItem>
          <DropdownMenuItem>Resend invitation</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            Remove from team
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export default function DataTableRowActions() {
  return <DataTable columns={COLUMNS} data={MEMBERS} />
}
