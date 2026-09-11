import {
  CaretRightIcon,
  ChartLineIcon,
  GearIcon,
  HouseIcon,
  TrayIcon,
} from "@phosphor-icons/react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@diametral/design-system/react"

const REPORTS = ["Traffic", "Conversion", "Retention"]

export default function SidebarNested() {
  return (
    <SidebarProvider className="min-h-64 w-full border border-border">
      <Sidebar collapsible="none" className="w-56">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Analytics</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <HouseIcon /> Overview
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <Collapsible defaultOpen render={<SidebarMenuItem />}>
                  <SidebarMenuButton
                    isActive
                    render={<CollapsibleTrigger />}
                    className="group/collapsible"
                  >
                    <ChartLineIcon /> Reports
                    <CaretRightIcon className="ms-auto transition-[rotate] group-aria-expanded/collapsible:rotate-90" />
                  </SidebarMenuButton>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {REPORTS.map((report) => (
                        <SidebarMenuSubItem key={report}>
                          <SidebarMenuSubButton
                            href="#sidebar"
                            isActive={report === "Traffic"}
                          >
                            {report}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <TrayIcon /> Inbox
                  </SidebarMenuButton>
                  <SidebarMenuBadge>12</SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <GearIcon /> Settings
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="p-4">
        <p className="text-sm text-muted-foreground">
          Traffic — 24 180 sessions this week.
        </p>
      </SidebarInset>
    </SidebarProvider>
  )
}
