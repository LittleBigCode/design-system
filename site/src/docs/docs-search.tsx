import * as React from "react"
import { useNavigate } from "react-router"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"

import { CommandPalette, Kbd } from "@diametral/design-system/react"

import { componentsByCategory } from "@registry/registry"

/**
 * CommandPalette filters the flat list itself, so the grouped registry is
 * flattened once into its `commands` shape — `group` is what restores the
 * category headings the sidebar also uses.
 */
const GROUPS = componentsByCategory()

export function DocsSearch() {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <>
      {/* Shaped like the Input rather than the Button: this is a field
          affordance, and Button's uppercase industrial type would read wrong on
          a placeholder. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 w-full max-w-56 items-center gap-2 border border-transparent border-b-input bg-transparent text-sm text-muted-foreground transition-[color,border-color] outline-none hover:border-b-ring focus-visible:border-b-ring"
      >
        <MagnifyingGlassIcon className="size-3.5 shrink-0" />
        <span className="flex-1 text-start">Search components…</span>
        <span className="flex shrink-0 items-center gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </span>
      </button>

      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        placeholder="Search components…"
        commands={GROUPS.flatMap((group) =>
          group.items.map((component) => ({
            id: component.slug,
            label: component.name,
            group: group.category,
            // The usage count doubles as the coverage map, same as the sidebar
            // badge; a component with none shows no hint rather than a zero.
            hint: component.examples?.length || undefined,
            onRun: () => {
              setOpen(false)
              navigate(`/docs/${component.slug}`)
            },
          }))
        )}
      />
    </>
  )
}
