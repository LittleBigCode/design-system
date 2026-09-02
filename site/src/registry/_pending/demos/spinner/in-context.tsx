import { Button } from "@diametral/ui/components/button"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@diametral/ui/components/empty"
import { Spinner } from "@diametral/ui/components/spinner"

export default function SpinnerInContext() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <Button disabled>
          <Spinner /> Saving
        </Button>
        <Button variant="outline" disabled>
          <Spinner /> Checking
        </Button>
      </div>

      <Empty className="border border-dashed border-border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Spinner />
          </EmptyMedia>
          <EmptyTitle>Loading projects</EmptyTitle>
        </EmptyHeader>
      </Empty>
    </div>
  )
}
