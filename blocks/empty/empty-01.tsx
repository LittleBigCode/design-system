import { PlusIcon, TableIcon } from "@phosphor-icons/react"

import {
  Button,
  Card,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@diametral/design-system/react"

export default function Empty01() {
  return (
    <div className="w-full p-6">
      <Card>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <TableIcon />
            </EmptyMedia>
            <EmptyTitle>No missions yet</EmptyTitle>
            <EmptyDescription>
              Create your first mission to compute a day rate, margin, and
              target salary.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="primary">
              <PlusIcon /> New mission
            </Button>
          </EmptyContent>
        </Empty>
      </Card>
    </div>
  )
}
