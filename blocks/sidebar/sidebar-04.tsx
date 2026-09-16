"use client"

import {
  CaretUpDownIcon,
  ChartLineIcon,
  FileTextIcon,
  GearIcon,
  LifebuoyIcon,
  UsersIcon,
} from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  PageHeader,
  PageHeaderActions,
  PageHeaderHeading,
  PageHeaderTitle,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@diametral/design-system/react"

const WORKSPACE = [
  { title: "Dashboard", icon: ChartLineIcon, active: true },
  { title: "Documents", icon: FileTextIcon, active: false },
  { title: "Members", icon: UsersIcon, active: false },
]

const SUPPORT = [
  { title: "Help centre", icon: LifebuoyIcon, active: false },
  { title: "Settings", icon: GearIcon, active: false },
]

export default function Sidebar04() {
  return (
    <SidebarProvider>
      {/* `icon`, not the default `offcanvas`: it is what narrows the column to
          --sidebar-width-icon (3rem) instead of sliding it off the edge. Below
          48rem the component swaps itself for a sheet either way. */}
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {WORKSPACE.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={item.active}
                      tooltip={item.title}
                    >
                      <item.icon /> {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Support</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {SUPPORT.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={item.active}
                      tooltip={item.title}
                    >
                      <item.icon /> {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Camille Roux">
                {/* `sm` (1.5rem), so the portrait still fits once the collapsed
                    row is clamped to 2rem square. */}
                <Avatar size="sm">
                  <AvatarFallback>CR</AvatarFallback>
                </Avatar>
                <span style={{ minWidth: 0, textAlign: "start" }}>
                  <span style={{ display: "block" }}>Camille Roux</span>
                  <span style={{ display: "block", fontSize: "0.75rem" }}>
                    camille@diametral.fr
                  </span>
                </span>
                <CaretUpDownIcon style={{ marginInlineStart: "auto" }} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset style={{ padding: "1.5rem" }}>
        <PageHeader>
          <PageHeaderHeading>
            <PageHeaderTitle>Dashboard</PageHeaderTitle>
            <PageHeaderActions>
              {/* The same trigger in both directions: it collapses the rail on
                  desktop and opens the off-canvas sheet below 48rem. */}
              <SidebarTrigger />
            </PageHeaderActions>
          </PageHeaderHeading>
        </PageHeader>
        <p>Nine documents updated since Monday.</p>
      </SidebarInset>
    </SidebarProvider>
  )
}
