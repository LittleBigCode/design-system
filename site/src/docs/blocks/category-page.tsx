import { useParams } from "react-router"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@diametral/design-system/react"

import { BlockFrame } from "@/docs/blocks/block-frame"
import { BLOCKS } from "@/registry/blocks"

/** Same "no catch-all redirect" rule as `foundation-page.tsx` and
 *  `component-page.tsx`: an unregistered category 404s visibly. */
export function BlockCategoryPage() {
  const { category = "" } = useParams()
  const entry = BLOCKS.find(([slug]) => slug === category)

  if (!entry) {
    return (
      <Empty className="mt-12">
        <EmptyHeader>
          <EmptyTitle>Unknown block</EmptyTitle>
          <EmptyDescription>
            No block category is registered under "{category}".
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  const [, name, description, variants] = entry

  return (
    <div className="flex flex-col gap-10">
      <header className="max-w-3xl">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Blocks
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          {name}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      </header>

      {variants.map(([variant, note]) => (
        <BlockFrame
          key={variant}
          category={category}
          name={variant}
          description={note}
        />
      ))}
    </div>
  )
}
