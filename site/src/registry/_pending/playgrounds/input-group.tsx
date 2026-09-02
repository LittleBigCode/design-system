import type { ComponentProps } from "react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@diametral/ui/components/input-group"

// The template renders every Input Group part: the Workbench's code strip
// doubles as the anatomy navigator, so a part missing here would not be
// selectable. Two groups, because InputGroupInput and InputGroupTextarea are
// alternative controls — one group never holds both. The props go to the first
// addon, whose alignment is the axis on show.
export default function InputGroupPlayground({
  children,
  ...props
}: ComponentProps<typeof InputGroupAddon>) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <InputGroup>
        <InputGroupAddon {...props}>
          <MagnifyingGlassIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search components…" />
      </InputGroup>

      <InputGroup>
        <InputGroupTextarea placeholder="Write a release note…" />
        <InputGroupAddon align="block-end">
          <InputGroupText>Markdown supported</InputGroupText>
          <InputGroupButton className="ms-auto" variant="outline">
            {children}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
