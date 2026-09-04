import {
  BellIcon,
  CaretCircleDownIcon,
  CaretRightIcon,
  ChatCircleIcon,
  CompassIcon,
  CursorClickIcon,
  type Icon,
  LayoutIcon,
  SquaresFourIcon,
  StackIcon,
  TableIcon,
  TextboxIcon,
  WrenchIcon,
} from "@phosphor-icons/react"
import { Link, Outlet, useLocation } from "react-router"

import { ThemeToggle } from "@/components/theme-toggle"
import { DocsSearch } from "@/docs/docs-search"
import {
  CATEGORIES,
  COMPONENTS,
  componentsByCategory,
} from "@registry/registry"

// The nav is the complete map of the system and never narrows in place — ⌘K
// (DocsSearch) is the only search surface — so the grouping is built once.
const GROUPS = componentsByCategory()

// Keyed off CATEGORIES rather than string, so adding a category to the registry
// fails the typecheck here instead of silently rendering an iconless row.
const CATEGORY_ICONS: Record<(typeof CATEGORIES)[number], Icon> = {
  Actions: CursorClickIcon,
  Forms: TextboxIcon,
  "Data display": TableIcon,
  Navigation: CompassIcon,
  Layout: LayoutIcon,
  Disclosure: CaretCircleDownIcon,
  Overlays: StackIcon,
  Feedback: BellIcon,
  Conversation: ChatCircleIcon,
  Utilities: WrenchIcon,
}

export function DocsLayout() {
  const { pathname } = useLocation()

  const activeCategory = GROUPS.find((group) =>
    group.items.some((component) => `/docs/${component.slug}` === pathname)
  )?.category

  return (
    <div className="flex min-h-svh">
      {/* `<details>` carries the disclosure state, the caret rotation and the
          keyboard contract natively. `open` is set rather than controlled: ⌘K
          can navigate straight into a component whose section is shut, and the
          browser keeps whatever the reader opens after that. */}
      <nav
        aria-label="Components"
        className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col overflow-y-auto border-e border-border bg-sidebar md:flex"
      >
        <Link
          to="/"
          className="flex items-center gap-2 border-b border-border p-4"
        >
          <span className="flex aspect-square size-8 items-center justify-center bg-sidebar-primary text-sidebar-primary-foreground">
            <SquaresFourIcon />
          </span>
          <span className="flex flex-col gap-0.5 leading-none">
            <span className="font-heading font-semibold tracking-wider uppercase">
              Diametral
            </span>
            <span className="text-xs text-muted-foreground">
              Design system · {COMPONENTS.length} components
            </span>
          </span>
        </Link>

        <div className="flex flex-col gap-0.5 p-2">
          {GROUPS.map((group) => {
            const CategoryIcon = CATEGORY_ICONS[group.category]
            return (
              <details
                key={group.category}
                open={group.category === activeCategory}
                className="group/category"
              >
                {/* A category has no page of its own — App.tsx routes only `/`
                    and `/docs/:slug` — so the whole row is the toggle rather
                    than a link plus a separate chevron action. */}
                <summary className="flex cursor-default list-none items-center gap-2 p-2 text-sm hover:bg-sidebar-accent [&::-webkit-details-marker]:hidden">
                  <CategoryIcon className="shrink-0" />
                  <span className="flex-1">{group.category}</span>
                  <CaretRightIcon className="shrink-0 transition-transform group-open/category:rotate-90" />
                </summary>
                <ul className="ms-4 flex flex-col border-s border-border ps-2">
                  {group.items.map((component) => {
                    const to = `/docs/${component.slug}`
                    const count = component.examples?.length ?? 0
                    return (
                      <li key={component.slug} className="flex items-center">
                        <Link
                          to={to}
                          aria-current={pathname === to ? "page" : undefined}
                          className="flex-1 truncate p-1.5 text-sm text-muted-foreground hover:text-foreground aria-[current=page]:font-medium aria-[current=page]:text-foreground"
                        >
                          {component.name}
                        </Link>
                        {/* The example count doubles as the coverage map: a
                            missing badge means the page has no usages yet. */}
                        {count > 0 ? (
                          <span className="shrink-0 pe-1.5 font-mono text-xs text-muted-foreground">
                            {count}
                          </span>
                        ) : null}
                      </li>
                    )
                  })}
                </ul>
              </details>
            )
          })}
        </div>
      </nav>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/85 px-6 py-3 backdrop-blur">
          <DocsSearch />
          <div className="flex-1" />
          <ThemeToggle />
        </header>
        <main className="mx-auto w-full max-w-5xl px-6 py-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
