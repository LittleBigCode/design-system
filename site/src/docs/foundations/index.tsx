import { Link } from "react-router"

import { Card, CardContent, CardTitle } from "@diametral/design-system/react"

import { FOUNDATIONS } from "@/docs/sections"

export function FoundationsIndex() {
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Foundations
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Foundations
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The brand system underneath every component — color, type, spacing,
          layout, motion, and the marks that make it recognizably Diametral.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {FOUNDATIONS.map(([slug, name, description]) => (
          <Link key={slug} to={`/foundations/${slug}`}>
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
