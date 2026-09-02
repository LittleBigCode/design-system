import { CaretDownIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import { ButtonGroup } from "@diametral/ui/components/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@diametral/ui/components/dropdown-menu"

export default function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button>Deploy to staging</Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button size="icon" aria-label="Other deploy targets" />}
        >
          <CaretDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Deploy to production</DropdownMenuItem>
          <DropdownMenuItem>Deploy a specific commit…</DropdownMenuItem>
          <DropdownMenuItem>Roll back last deploy</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
