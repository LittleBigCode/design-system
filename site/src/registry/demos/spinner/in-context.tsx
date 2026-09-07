import {
  Button,
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Spinner,
} from "@diametral/design-system/react"
export default function SpinnerInContext() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <Button disabled>
          <Spinner /> Saving
        </Button>
        <Button disabled>
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
