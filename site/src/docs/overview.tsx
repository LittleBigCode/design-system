import { Link } from "react-router"

import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@diametral/design-system/react"

import { COMPONENTS, componentsByCategory } from "@registry/registry"

const SWATCHES = [
  { name: "black", token: "--ds-noir" },
  { name: "red", token: "--ds-rouge" },
  { name: "brown", token: "--ds-marron" },
  { name: "khaki", token: "--ds-kaki" },
  { name: "beige", token: "--ds-beige" },
  { name: "green", token: "--ds-vert" },
  { name: "blue", token: "--ds-bleu" },
  { name: "yellow", token: "--ds-jaune" },
]

export function Overview() {
  const documented = COMPONENTS.filter(
    (component) => (component.examples?.length ?? 0) > 0
  )
  const exampleCount = COMPONENTS.reduce(
    (total, component) => total + (component.examples?.length ?? 0),
    0
  )

  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Diametral × shadcn
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          72 components on Diametral brand tokens — 59 of the 60 shadcn registry
          components plus 13 additions. The native{" "}
          <code className="font-mono text-xs">select</code> is the one omission
          — the OS paints its own dropdown, so it can never honour the charter,
          and <code className="font-mono text-xs">Select</code> replaces it.
          Radius is <code className="font-mono text-xs">0</code> by charter,
          type is Ufficio and Geist only, and every colour resolves through a{" "}
          <code className="font-mono text-xs">--ds-*</code> semantic.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Badge>
            {documented.length} of {COMPONENTS.length} documented
          </Badge>
          <Badge>{exampleCount} usages</Badge>
        </div>
      </header>

      <section>
        <h2 className="font-heading text-lg font-semibold tracking-wider uppercase">
          Palette
        </h2>
        <div className="mt-4 flex flex-wrap gap-4">
          {SWATCHES.map((swatch) => (
            <div key={swatch.name} className="flex flex-col gap-1.5">
              <div
                className="size-14 border border-border"
                style={{ background: `var(${swatch.token})` }}
              />
              <span className="font-mono text-[10px] text-muted-foreground">
                {swatch.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-lg font-semibold tracking-wider uppercase">
          Type
        </h2>
        <div className="mt-4 flex flex-col gap-1">
          <p className="font-heading text-2xl font-light">Ufficio title face</p>
          <p className="text-base">Geist body — 14px base, 130% leading.</p>
          <p className="font-mono text-xs text-muted-foreground">
            Geist Mono for tokens and code.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-heading text-lg font-semibold tracking-wider uppercase">
          Components
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {componentsByCategory().map((group) => (
            <Card key={group.category}>
              <CardHeader>
                <CardTitle>{group.category}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-x-3 gap-y-1.5">
                {group.items.map((component) => (
                  <Link
                    key={component.slug}
                    to={`/docs/${component.slug}`}
                    className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {component.name}
                  </Link>
                ))}
              </CardContent>
              <CardFooter>{`${group.items.length} components`}</CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
