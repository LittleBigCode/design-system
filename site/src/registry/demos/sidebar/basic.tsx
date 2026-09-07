import {
  CaretRightIcon,
  ChartBarIcon,
  CreditCardIcon,
  DatabaseIcon,
  GearIcon,
  HouseIcon,
  PlayIcon,
  UsersIcon,
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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@diametral/design-system/react"

export default function SidebarBasic() {
  return (
    <SidebarProvider className="min-h-64 w-full border border-border">
      <Sidebar collapsible="none" className="w-56">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <HouseIcon /> Overview
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <Collapsible defaultOpen render={<SidebarMenuItem />}>
                  <SidebarMenuButton
                    render={<CollapsibleTrigger />}
                    className="group/collapsible"
                  >
                    <PlayIcon /> Pipelines
                    <CaretRightIcon className="ms-auto transition-[rotate] group-aria-expanded/collapsible:rotate-90" />
                  </SidebarMenuButton>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#runs">
                          Runs
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#schedules">
                          Schedules
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <DatabaseIcon /> Datasets
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
                        <SidebarMenuSubButton href="#members">
                          <UsersIcon /> Members
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#billing">
                          <CreditCardIcon /> Billing
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="p-4">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <ChartBarIcon /> Overview content area.
        </p>
      </SidebarInset>
    </SidebarProvider>
  )
}
