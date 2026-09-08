import { Link } from "react-router"

import { Card, CardContent, CardTitle } from "@diametral/design-system/react"

const TOPICS = [
  ["color", "Color", "Brand primitives, the neutral UI ramp, and the semantic tokens components read."],
  ["typography", "Typography", "Ufficio titles, Geist body, uppercase labels, tabular numerals."],
  ["spacing", "Spacing", "The eight-step px scale lifted from the source app."],
  ["layout", "Layout", "Max-width containers, the two-column grid, sticky chrome."],
  ["borders", "Borders & rules", "Structure from 1px rules in two weights — never shadows."],
  ["grid", "Grid system", "Ruled columns, stat grids, framed edges, registration marks."],
  ["motion", "Motion", "Short .2–.25s transitions and one restrained fade-in."],
  ["no-radius", "No radius", "border-radius: 0 everywhere, on one token."],
  ["logo", "Logo", "Circle, square, diagonal line — the mark and its wordmark."],
  ["iconography", "Iconography", "1.5-stroke line icons on a 24-unit grid."],
  ["photography", "Photography", "Natural macro textures — warm wood, cool ice and water."],
] as const

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
        {TOPICS.map(([slug, name, description]) => (
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
