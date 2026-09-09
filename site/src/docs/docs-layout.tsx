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
  Wordmark,
} from "@diametral/design-system/react"

import { ThemeToggle } from "@/components/theme-toggle"
import { DocsSearch } from "@/docs/docs-search"
import {
  BLOCKS,
  FOUNDATIONS,
  type SectionItem,
  TEMPLATES,
} from "@/docs/sections"
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

// The three flat sections read their rows off the same arrays their index pages
// render from, imported rather than restated: a section that grows a page grows
// its nav row in the same commit, and a slug can only be wrong in one place.
type Section = {
  label: string
  base: string
  items: readonly SectionItem[]
}

const FOUNDATIONS_SECTION: Section = {
  label: "Foundations",
  base: "/foundations",
  items: FOUNDATIONS,
}
const TEMPLATES_SECTION: Section = {
  label: "Templates",
  base: "/templates",
  items: TEMPLATES,
}
const BLOCKS_SECTION: Section = {
  label: "Blocks",
  base: "/blocks",
  items: BLOCKS,
}

/**
 * A section is open when the reader is inside it and stays wherever the reader
 * last put it — `undefined` rather than a boolean seed, so following a ⌘K jump
 * into a shut section still reveals the row that just became active.
 */
function useSectionOpen(active: boolean) {
  const [toggled, setToggled] = React.useState<boolean>()
  return [toggled ?? active, setToggled] as const
}

function NavSection({
  section,
  pathname,
}: {
  section: Section
  pathname: string
}) {
  const [open, setOpen] = useSectionOpen(pathname.startsWith(section.base))

  return (
    <Collapsible open={open} onOpenChange={setOpen} render={<SidebarGroup />}>
      <SidebarGroupLabel
        render={<CollapsibleTrigger />}
        className="group/section w-full"
      >
        {section.label}
        <CaretRightIcon className="ms-auto transition-transform group-aria-expanded/section:rotate-90" />
      </SidebarGroupLabel>
      <CollapsibleContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === section.base}
              render={<Link to={section.base} />}
            >
              All {section.label.toLowerCase()}
            </SidebarMenuButton>
          </SidebarMenuItem>
          {section.items.map(([slug, name]) => {
            const to = `${section.base}/${slug}`
            return (
              <SidebarMenuItem key={slug}>
                <SidebarMenuButton
                  isActive={pathname === to}
                  render={<Link to={to} />}
                >
                  {name}
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </CollapsibleContent>
    </Collapsible>
  )
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
  const [componentsOpen, setComponentsOpen] = useSectionOpen(
    pathname === "/" || pathname.startsWith("/docs")
  )

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" render={<Link to="/" />}>
                <Wordmark
                  variant="square"
                  label=""
                  className="flex aspect-square size-8 items-center justify-center"
                />
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
          {/* Flat and always open: four rows the reader needs before they know
              what they are looking for, so nothing here hides behind a chevron. */}
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/"}
                  render={<Link to="/" />}
                >
                  Overview
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/kitchen-sink"}
                  render={<Link to="/kitchen-sink" />}
                >
                  Kitchen sink
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
                  isActive={pathname === "/installation"}
                  render={<Link to="/installation" />}
                >
                  Installation
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <NavSection section={FOUNDATIONS_SECTION} pathname={pathname} />

          <Collapsible
            open={componentsOpen}
            onOpenChange={setComponentsOpen}
            render={<SidebarGroup />}
          >
            <SidebarGroupLabel
              render={<CollapsibleTrigger />}
              className="group/section w-full"
            >
              Components
              <CaretRightIcon className="ms-auto transition-transform group-aria-expanded/section:rotate-90" />
            </SidebarGroupLabel>
            <CollapsibleContent>
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
            </CollapsibleContent>
          </Collapsible>

          <NavSection section={TEMPLATES_SECTION} pathname={pathname} />
          <NavSection section={BLOCKS_SECTION} pathname={pathname} />
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
