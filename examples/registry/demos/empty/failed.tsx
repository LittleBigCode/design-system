import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@diametral/design-system/react"
import { ArrowClockwiseIcon, CloudSlashIcon } from "@phosphor-icons/react"

export default function EmptyFailed() {
  return (
    <Empty role="status" className="border border-dashed border-border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CloudSlashIcon />
        </EmptyMedia>
        <EmptyTitle>Could not load invoices</EmptyTitle>
        <EmptyDescription>
          The request timed out after 30 seconds. Nothing was lost — try again.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">
          <ArrowClockwiseIcon /> Retry
        </Button>
      </EmptyContent>
    </Empty>
  )
}
