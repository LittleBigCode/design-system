import { useParams } from "react-router"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@diametral/design-system/react"

import { AppChrome } from "@/docs/blocks/app-chrome"
import { Auth } from "@/docs/blocks/auth"
import { DataDetail } from "@/docs/blocks/data-detail"
import { Marketing } from "@/docs/blocks/marketing"

const BLOCKS: Record<string, React.ComponentType> = {
  "app-chrome": AppChrome,
  auth: Auth,
  marketing: Marketing,
  "data-detail": DataDetail,
}

/** Same "no catch-all redirect" rule as `foundation-page.tsx` and
 * `component-page.tsx`. */
export function BlockPage() {
  const { slug = "" } = useParams()
  const Block = BLOCKS[slug]

  if (!Block) {
    return (
      <Empty className="mt-12">
        <EmptyHeader>
          <EmptyTitle>Unknown block</EmptyTitle>
          <EmptyDescription>
            No block is registered under "{slug}".
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return <Block />
}
