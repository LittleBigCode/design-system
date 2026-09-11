import { Link } from "react-router"

import { Card, CardContent, CardTitle } from "@diametral/design-system/react"

import {
  BLOCKS,
  FOUNDATIONS,
  TEMPLATES,
  type SectionItem,
} from "@/docs/sections"
import { COMPONENTS, componentsByCategory } from "@registry/registry"

// The six the charter leads with, in the strip's order. The chip reads the
// token so a charter change follows it; the caption prints the hex the charter
// publishes.
const PALETTE = [
  ["Noir", "--ds-noir", "#161616"],
  ["Gris", "--ds-gris", "#767884"],
  ["Marron", "--ds-marron", "#9F8667"],
  ["Kaki", "--ds-kaki", "#AAB0A6"],
  ["Beige", "--ds-beige", "#D5D3C4"],
  ["Jaune", "--ds-jaune", "#F4FBDA"],
] as const

const REACT_EXPORTS = COMPONENTS.reduce(
  (total, component) => total + (component.exports?.length ?? 0),
  0
)

// Every page the site renders: the registry's component routes, the three
// index lists, and the three standalone pages (this one, installation,
// theming). Derived rather than typed in, so it cannot go stale.
const PAGES =
  3 + COMPONENTS.length + FOUNDATIONS.length + TEMPLATES.length + BLOCKS.length

function CardGrid({
  base,
  entries,
}: {
  base: string
  entries: readonly SectionItem[]
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {entries.map(([slug, name, description]) => (
        <Link key={slug} to={`${base}/${slug}`}>
          <Card>
            <CardContent className="flex flex-col gap-1 pt-6">
              <CardTitle>{name}</CardTitle>
              <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export function Overview() {
  return (
    <div className="flex flex-col gap-16">
      <header>
        <svg
          viewBox="0 0 56 56"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
          className="size-21 text-foreground"
        >
          <circle cx="28" cy="28" r="24" />
          <rect x="12" y="12" width="32" height="32" />
          <line x1="12" y1="44" x2="44" y2="12" />
        </svg>
        <h1 className="ds-title mt-6 text-[64px] leading-none">Diametral</h1>
        {/* Not `.ds-kicker`: that class carries its own ink-faint colour and
            wins the cascade over a utility, and this eyebrow is the accent. */}
        <p className="mt-3 text-[13px] uppercase tracking-[0.18em] text-[color:var(--ds-accent-ink)]">
          Design System — Welcome to (the real)
        </p>
        <p className="mt-7 text-base tracking-[0.06em]">
          <b className="font-normal">Minimal</b> ·{" "}
          <b className="font-normal">Enduring</b> ·{" "}
          <b className="font-normal">Elegant</b>
        </p>
        <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-muted-foreground">
          A flat, buildless design system extracted from the Diametral brand:
          1px rules, no shadows, no border-radius, Ufficio headings over Geist
          body. Refined and structured — deliberately away from tech and
          consulting clichés.
        </p>
        <p className="mt-6 flex flex-wrap gap-3">
          {/* The 0.11 hero pointed its primary at examples/demo.html. That app
              is not part of the React site, and site/legacy/ is not copied into
              the build, so the dashboard template is the live screen here. */}
          <Link
            to="/templates/dashboard"
            className="ds-button ds-button--primary ds-button--lg no-underline"
          >
            ▸ Open the dashboard template
          </Link>
          <Link
            to="/installation"
            className="ds-button ds-button--lg no-underline"
          >
            Installation guide
          </Link>
        </p>
      </header>

      <section
        aria-label="Primary palette"
        className="grid grid-cols-3 border border-[color:var(--ds-ink)] sm:grid-cols-6"
      >
        {PALETTE.map(([name, token, hex]) => (
          <div
            key={name}
            className="border-r border-[color:var(--ds-rule)] bg-background last:border-r-0"
          >
            <div className="h-24" style={{ background: `var(${token})` }} />
            <div className="px-3 py-2.5">
              <div className="text-xs">{name}</div>
              <div className="ds-numeric mt-0.5 text-[11px] text-muted-foreground">
                {hex}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section>
        <p className="ds-gridlabel mb-4">The system in numbers</p>
        <div className="ds-statgrid">
          <div className="ds-statgrid__cell">
            <div className="ds-statgrid__label">Components</div>
            <div className="ds-statgrid__value">{COMPONENTS.length}</div>
          </div>
          <div className="ds-statgrid__cell">
            <div className="ds-statgrid__label">React exports</div>
            <div className="ds-statgrid__value">{REACT_EXPORTS}</div>
          </div>
          <div className="ds-statgrid__cell">
            <div className="ds-statgrid__label">Showcase pages</div>
            <div className="ds-statgrid__value">{PAGES}</div>
          </div>
          <div className="ds-statgrid__cell">
            <div className="ds-statgrid__label">Themes</div>
            <div className="ds-statgrid__value">2</div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="ds-title ds-title--lg mb-4">Foundations</h2>
        <CardGrid base="/foundations" entries={FOUNDATIONS} />
      </section>

      <section>
        <h2 className="ds-title ds-title--lg">Components</h2>
        {componentsByCategory().map((group) => (
          <div key={group.category}>
            <p className="ds-label mt-5 mb-2.5">{group.category}</p>
            <CardGrid
              base="/docs"
              entries={group.items.map(
                (component) =>
                  [
                    component.slug,
                    component.name,
                    component.description,
                  ] as const
              )}
            />
          </div>
        ))}
      </section>

      <section>
        <h2 className="ds-title ds-title--lg mb-4">Templates</h2>
        <CardGrid base="/templates" entries={TEMPLATES} />
      </section>

      <section>
        <h2 className="ds-title ds-title--lg">Blocks</h2>
        <p className="mt-2 mb-4 text-sm text-muted-foreground">
          Composed, copy-paste sections — app chrome, auth, marketing and
          data/detail — built from the components and the visible grid system.
        </p>
        <CardGrid base="/blocks" entries={BLOCKS} />
      </section>

      <section>
        <h2 className="ds-title ds-title--lg mb-2">Principles</h2>
        <p className="text-sm text-muted-foreground">
          Flat &amp; sharp — 1px borders, no shadows, no border-radius. &nbsp;·&nbsp;
          White / whitesmoke surfaces, black ink. &nbsp;·&nbsp; Ufficio titles
          over Geist body, uppercase labels at 0.08em, tabular numerals.
        </p>
      </section>
    </div>
  )
}
