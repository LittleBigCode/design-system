import { MagnifyingGlassIcon } from "@phosphor-icons/react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@diametral/ui/components/input-group"

export default function InputGroupAddons() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <InputGroup>
        <InputGroupAddon>
          <MagnifyingGlassIcon />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search components…"
          aria-label="Search components"
        />
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="0,00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>EUR</InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="diametral.com" />
      </InputGroup>
    </div>
  )
}
