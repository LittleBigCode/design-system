import { Link } from "react-router"

import { Card, CardContent, CardTitle } from "@diametral/design-system/react"

import { BLOCKS } from "@/registry/blocks"

export function BlocksIndex() {
  return (
    <div className="flex flex-col gap-8">
      <header className="max-w-3xl">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Blocks
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Blocks
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Whole sections and screens, composed from the component library. Every
          variant is one React file under{" "}
          <code className="font-mono text-xs">blocks/</code> in the published
          package — copy it, own it, change the content.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BLOCKS.map(([category, name, description, variants]) => (
          <Link key={category} to={`/blocks/${category}`}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-1 pt-6">
                <CardTitle>{name}</CardTitle>
                <p className="text-sm text-muted-foreground">{description}</p>
                <p className="mt-auto pt-3 font-mono text-xs text-muted-foreground">
                  {variants.length} variant{variants.length > 1 ? "s" : ""}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
