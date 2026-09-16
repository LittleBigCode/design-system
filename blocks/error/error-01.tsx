import { MagnifyingGlassIcon } from "@phosphor-icons/react"

import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@diametral/design-system/react"

/** The whole screen: the empty-state pattern scaled up on the brand
 *  background, its own frame rather than an application's chrome. */
export default function Error01() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon" className="text-5xl">
            <MagnifyingGlassIcon />
          </EmptyMedia>
          <EmptyTitle>Page not found</EmptyTitle>
          <EmptyDescription>
            We couldn't find the page you were looking for. It may have been
            moved, renamed, or never existed.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="primary" render={<a href="#error-01" />}>
            Back to home
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
