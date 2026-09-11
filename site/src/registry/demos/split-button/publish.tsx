import { GlobeIcon, LinkIcon, UsersIcon } from "@phosphor-icons/react"

import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  SplitButton,
} from "@diametral/design-system/react"

export default function SplitButtonPublish() {
  return (
    <SplitButton
      tone="green"
      menuLabel="Other publish options"
      menu={
        <>
          <DropdownMenuLabel>Publish to</DropdownMenuLabel>
          <DropdownMenuItem>
            <UsersIcon />
            The team only
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LinkIcon />
            Anyone with the link
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <GlobeIcon />
            The public web
          </DropdownMenuItem>
        </>
      }
    >
      Publish
    </SplitButton>
  )
}
