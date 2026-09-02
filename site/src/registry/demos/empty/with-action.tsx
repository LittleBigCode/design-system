import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@diametral/design-system/react"
import { MagnifyingGlassIcon, PlusIcon } from "@phosphor-icons/react"

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
        <Button size="sm">
          Clear search
        </Button>
      </EmptyContent>
    </Empty>
  )
}
