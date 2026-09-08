import * as React from "react"
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

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@diametral/design-system/react"

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

  // Sections are controlled, not `defaultOpen`: ⌘K can navigate straight into a
  // component whose section is shut, and an uncontrolled section mounted closed
  // would hide the row that just became active. Falling back to the active
  // section keeps that in sync until the reader takes over a given section.
  const [toggled, setToggled] = React.useState<Record<string, boolean>>({})

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" render={<Link to="/" />}>
                <div className="flex aspect-square size-8 items-center justify-center bg-sidebar-primary text-sidebar-primary-foreground">
                  <SquaresFourIcon />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-heading font-semibold tracking-wider uppercase">
                    Diametral
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Design system · {COMPONENTS.length} components
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Guides</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/installation"}
                  render={<Link to="/installation" />}
                >
                  Installation
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/theming"}
                  render={<Link to="/theming" />}
                >
                  Theming
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname.startsWith("/foundations")}
                  render={<Link to="/foundations" />}
                >
                  Foundations
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Components</SidebarGroupLabel>
            <SidebarMenu>
              {GROUPS.map((group) => {
                const CategoryIcon = CATEGORY_ICONS[group.category]
                const open =
                  toggled[group.category] ?? group.category === activeCategory
                return (
                  <Collapsible
                    key={group.category}
                    open={open}
                    onOpenChange={(next) =>
                      setToggled((previous) => ({
                        ...previous,
                        [group.category]: next,
                      }))
                    }
                    render={<SidebarMenuItem />}
                  >
                    {/* A category has no page of its own — App.tsx routes only
                        `/` and `/docs/:slug` — so unlike sidebar-08 the whole
                        row is the trigger rather than a link plus a separate
                        chevron action. */}
                    <CollapsibleTrigger
                      render={
                        <SidebarMenuButton className="group/category">
                          <CategoryIcon />
                          <span>{group.category}</span>
                          <CaretRightIcon className="ms-auto transition-transform group-aria-expanded/category:rotate-90" />
                        </SidebarMenuButton>
                      }
                    />
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {group.items.map((component) => {
                          const to = `/docs/${component.slug}`
                          const count = component.examples?.length ?? 0
                          return (
                            <SidebarMenuSubItem key={component.slug}>
                              <SidebarMenuSubButton
                                isActive={pathname === to}
                                render={<Link to={to} />}
                              >
                                {component.name}
                              </SidebarMenuSubButton>
                              {/* The example count doubles as the coverage map:
                                  a missing badge means the page has no usages
                                  yet. `top-1` because the badge centres itself
                                  off the peer menu button's data-size, which a
                                  sub button — h-7, data-size="md" — never
                                  emits. */}
                              {count > 0 ? (
                                <SidebarMenuBadge className="top-1">
                                  {count}
                                </SidebarMenuBadge>
                              ) : null}
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/85 px-6 py-3 backdrop-blur">
          <SidebarTrigger />
          <DocsSearch />
          <div className="flex-1" />
          <ThemeToggle />
        </header>
        <main className="mx-auto w-full max-w-5xl px-6 py-10">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
