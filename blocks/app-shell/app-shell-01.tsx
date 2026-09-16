import {
  CaretUpDownIcon,
  ChartLineIcon,
  DotsThreeIcon,
  FilesIcon,
  UsersIcon,
} from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@diametral/design-system/react"

const WORKSPACE = [
  { title: "Dashboard", icon: ChartLineIcon, active: true, count: null },
  { title: "Documents", icon: FilesIcon, active: false, count: "24" },
  { title: "Members", icon: UsersIcon, active: false, count: "7" },
]

export default function AppShell01() {
  return (
    <SidebarProvider className="min-h-svh">
      <Sidebar collapsible="none" className="w-60">
        <SidebarHeader>
          <SidebarInput
            aria-label="Search the workspace"
            placeholder="Search…"
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {WORKSPACE.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.active}>
                      <item.icon /> {item.title}
                    </SidebarMenuButton>
                    {/* Badge and action share the end of the row, so the count
                        gives way to the menu on hover. */}
                    {item.count ? (
                      <SidebarMenuBadge className="transition-opacity group-hover/menu-item:opacity-0">
                        {item.count}
                      </SidebarMenuBadge>
                    ) : null}
                    <SidebarMenuAction
                      showOnHover
                      aria-label={`Options for ${item.title}`}
                    >
                      <DotsThreeIcon />
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <Avatar className="size-7">
                  <AvatarFallback>CR</AvatarFallback>
                </Avatar>
                <span className="flex min-w-0 flex-col text-start">
                  <span className="truncate">Camille Roux</span>
                  <span className="truncate text-xs text-muted-foreground">
                    camille@diametral.fr
                  </span>
                </span>
                <CaretUpDownIcon className="ms-auto text-muted-foreground" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="p-6">
        <h1 className="font-heading text-2xl font-light tracking-tight">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Nine documents updated since Monday.
        </p>
      </SidebarInset>
    </SidebarProvider>
  )
}
