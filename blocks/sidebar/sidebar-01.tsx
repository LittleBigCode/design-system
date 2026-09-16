import {
  FilesIcon,
  GearIcon,
  HouseIcon,
  UsersIcon,
} from "@phosphor-icons/react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@diametral/design-system/react"

const NAV = [
  { title: "Overview", icon: HouseIcon, active: true },
  { title: "Documents", icon: FilesIcon, active: false },
  { title: "Members", icon: UsersIcon, active: false },
  { title: "Settings", icon: GearIcon, active: false },
]

export default function Sidebar01() {
  return (
    <SidebarProvider className="min-h-svh">
      <Sidebar collapsible="none" className="w-60">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {NAV.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={item.active}>
                    <item.icon /> {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="p-6">
        <p className="text-sm text-muted-foreground">
          Nine documents updated since Monday.
        </p>
      </SidebarInset>
    </SidebarProvider>
  )
}
