import { ArrowClockwiseIcon, CloudSlashIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@diametral/ui/components/empty"

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
        <Button size="sm" variant="outline">
          <ArrowClockwiseIcon /> Retry
        </Button>
      </EmptyContent>
    </Empty>
  )
}
