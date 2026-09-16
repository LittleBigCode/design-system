import {
  CaretRightIcon,
  ChartLineIcon,
  GearIcon,
  TrayIcon,
} from "@phosphor-icons/react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
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

export default function Sidebar03() {
  return (
    <SidebarProvider className="min-h-svh">
      <Sidebar collapsible="none" className="w-60">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
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
                          href="#sidebar-03"
                          isActive={report === "Traffic"}
                        >
                          {report}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible render={<SidebarMenuItem />}>
                <SidebarMenuButton
                  render={<CollapsibleTrigger />}
                  className="group/collapsible"
                >
                  <GearIcon /> Settings
                  <CaretRightIcon className="ms-auto transition-[rotate] group-aria-expanded/collapsible:rotate-90" />
                </SidebarMenuButton>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#sidebar-03">
                        Members
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <TrayIcon /> Inbox
                </SidebarMenuButton>
                {/* Counts live in the badge, never in the label text. */}
                <SidebarMenuBadge>12</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="p-6">
        <p className="text-sm text-muted-foreground">
          Traffic — 24 180 sessions this week.
        </p>
      </SidebarInset>
    </SidebarProvider>
  )
}
