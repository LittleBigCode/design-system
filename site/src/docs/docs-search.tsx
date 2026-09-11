import * as React from "react"
import { useNavigate } from "react-router"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
  Kbd,
  KbdGroup,
} from "@diametral/design-system/react"

import { componentsByCategory } from "@registry/registry"

/**
 * The grouped registry already shapes into `Command`'s own `CommandGroup`s —
 * batch 13 (#46) dropped the flat `commands` prop `CommandPalette` took.
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
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search components"
        description="Search for a component to open"
      >
        <Command>
          <CommandInput placeholder="Search components…" />
          <CommandList>
            <CommandEmpty>No components found.</CommandEmpty>
            {GROUPS.map((group) => (
              <CommandGroup key={group.category} heading={group.category}>
                {group.items.map((component) => (
                  <CommandItem
                    key={component.slug}
                    value={component.name}
                    onSelect={() => {
                      setOpen(false)
                      navigate(`/docs/${component.slug}`)
                    }}
                  >
                    {component.name}
                    {/* The usage count doubles as the coverage map, same as the
                        sidebar badge; a component with none shows no hint rather
                        than a zero. */}
                    {component.examples?.length ? (
                      <CommandShortcut>{component.examples.length}</CommandShortcut>
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
