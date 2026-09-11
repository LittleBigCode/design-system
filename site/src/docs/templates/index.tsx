import { Link } from "react-router"

import { Card, CardContent, CardTitle } from "@diametral/design-system/react"

import { TEMPLATES } from "@/docs/sections"

export function TemplatesIndex() {
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Templates
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Templates
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Full standalone screens — the whole page, not a section of one.
          Each is its own frame rather than the docs chrome.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {TEMPLATES.map(([slug, name, description]) => (
          <Link key={slug} to={`/templates/${slug}`}>
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
