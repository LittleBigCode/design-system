import { MagnifyingGlassIcon, PlusIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@diametral/ui/components/empty"

export default function EmptyWithAction() {
  return (
    <Empty className="border border-dashed border-border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MagnifyingGlassIcon />
        </EmptyMedia>
        <EmptyTitle>No results for “khaki”</EmptyTitle>
        <EmptyDescription>
          Check the spelling, or create the token yourself.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">
          <PlusIcon /> New token
        </Button>
        <Button variant="ghost" size="sm">
          Clear search
        </Button>
      </EmptyContent>
    </Empty>
  )
}
