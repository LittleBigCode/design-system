import { ShareNetworkIcon, UserPlusIcon } from "@phosphor-icons/react"

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@diametral/design-system/react"

export default function DropdownMenuSubmenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
        Share
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserPlusIcon /> Invite by email
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ShareNetworkIcon /> Copy link
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Anyone with the link</DropdownMenuItem>
            <DropdownMenuItem>Only my organisation</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Restricted</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
