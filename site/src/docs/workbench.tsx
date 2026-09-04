import * as React from "react"
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react"

import { Button, cx } from "@diametral/design-system/react"

import {
  anatomyFor,
  exceptionFor,
  hasAnatomy,
  PartHighlight,
  PartIndex,
} from "@/docs/anatomy"
import { GeneratedCode, usePlaygroundControls } from "@/docs/playground"
import { Prose } from "@/docs/prose"
import type { ComponentDoc } from "@registry/registry"

/**
 * One surface for exploring a component: an index of its parts, the playground
 * template rendered live, the props that drive it, and the generated code.
 *
 * The index is the only navigator; the preview and the code both answer it.
 * Hovering or selecting a part isolates it in each: the preview blurs everything
 * that neither is nor contains the part, and the code blurs everything outside
 * that element's own tags. The snippet itself stays inert so it remains
 * selectable and copyable.
 *
 * Parts the template does not render are marked in the index rather than hidden,
 * so the export surface stays visible even where the playground cannot show it.
 */
export function Workbench({ component }: { component: ComponentDoc }) {
  const { slug } = component
  const controls = usePlaygroundControls(slug)
  const data = anatomyFor(slug)
  const navigable = hasAnatomy(slug)
  const [selected, setSelected] = React.useState<string | null>(null)
  const [hovered, setHovered] = React.useState<string | null>(null)

  if (!controls) return null

  const select = (part: string) =>
    setSelected((current) => (current === part ? null : part))

  const slotsOf = (part: string | null) =>
    part ? (data?.slots[part] ?? []) : []

  const inTemplate = data?.coverage.playground ?? []
  // A part with no composition anywhere carries the reason as its note, unless
  // the registry already says something more specific about it.
  const note = selected
    ? (component.parts?.[selected] ?? exceptionFor(slug, selected))
    : undefined
  // A selected type has no part note — its declaration is the description.
  const typeDecl = selected
    ? data?.types.find((t) => t.name === selected)?.decl
    : undefined

  return (
    <section id="workbench" className="scroll-mt-20">
      <header className="mb-3 flex items-baseline justify-between gap-4">
        <h2 className="font-heading text-base font-semibold tracking-wider uppercase">
          Workbench
        </h2>
        {controls.touched ? (
          <Button size="sm" onClick={controls.reset}>
            <ArrowCounterClockwiseIcon /> Reset
          </Button>
        ) : null}
      </header>

      {controls.note ? (
        <Prose className="mb-3 max-w-2xl">{controls.note}</Prose>
      ) : null}

      <PartHighlight
        outline={hovered && hovered !== selected ? slotsOf(hovered) : []}
        blur={slotsOf(selected)}
      />

      <div
        className={cx(
          "grid border border-border",
          // The index column is content-sized: panel's six short names need far
          // less than sidebar's twenty-three. The controls column is
          // unconditional because that rail always renders — it says "no
          // controls declared" when a component has none.
          navigable
            ? "lg:grid-cols-[auto_1fr_240px]"
            : "lg:grid-cols-[1fr_240px]"
        )}
      >
        {navigable ? (
          <div className="border-b border-border lg:border-e lg:border-b-0">
            <PartIndex
              slug={slug}
              inTemplate={inTemplate}
              examples={component.examples ?? []}
              selected={selected}
              hovered={hovered}
              onSelect={select}
              onHover={setHovered}
            />
          </div>
        ) : null}

        {/* `min-w-0`: a grid item defaults to `min-width: auto`, so a subject
            wider than its track (kanban's three 16rem columns) grows the track
            past the grid instead of scrolling inside it. */}
        <div className="flex min-w-0 flex-col">
          <div
            data-workbench-preview
            className="flex min-h-56 flex-1 items-center justify-center p-8"
          >
            <controls.Subject {...controls.renderProps} />
          </div>

          {note ? (
            <div className="border-t border-border px-4 py-3">
              <Prose className="text-xs">{`\`${selected}\` — ${note}`}</Prose>
            </div>
          ) : typeDecl ? (
            <div className="border-t border-border px-4 py-3">
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-muted-foreground">
                {typeDecl}
              </pre>
            </div>
          ) : null}
        </div>

        <aside className="flex flex-col gap-4 border-t border-border p-4 lg:border-s lg:border-t-0">
          {controls.rail}
        </aside>
      </div>

      <GeneratedCode
        code={controls.code}
        selected={selected}
        hovered={hovered}
      />
    </section>
  )
}
