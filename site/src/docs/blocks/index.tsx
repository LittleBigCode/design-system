import { Link } from "react-router"

import { Card, CardContent, CardTitle } from "@diametral/design-system/react"

import { BLOCKS } from "@/docs/sections"

export function BlocksIndex() {
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Blocks
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Blocks
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Composed, copy-paste sections built from the component library and
          the visible grid system — the larger building units between
          components and a full page.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {BLOCKS.map(([slug, name, description]) => (
          <Link key={slug} to={`/blocks/${slug}`}>
            <Card>
              <CardContent className="flex flex-col gap-1 pt-6">
                <CardTitle>{name}</CardTitle>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
