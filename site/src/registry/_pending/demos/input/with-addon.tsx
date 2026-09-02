import { MagnifyingGlassIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@diametral/ui/components/input-group"

export default function InputWithAddon() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupAddon>
          <MagnifyingGlassIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search components…" />
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Invite by email" />
        <InputGroupAddon align="inline-end">
          <Button size="sm">Invite</Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
