import {
  CaretUpDownIcon,
  DotsThreeIcon,
  FileTextIcon,
  HouseIcon,
  LifebuoyIcon,
  PlusIcon,
  SignOutIcon,
  UserIcon,
  UsersIcon,
} from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
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
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarSeparator,
} from "@diametral/design-system/react"

const WORKSPACE = [
  { title: "Dashboard", icon: HouseIcon, active: true, count: null },
  { title: "Documents", icon: FileTextIcon, active: false, count: "24" },
  { title: "Members", icon: UsersIcon, active: false, count: "7" },
]

export default function SidebarShell() {
  return (
    <SidebarProvider className="min-h-72 w-full border border-border">
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
            <SidebarGroupAction aria-label="New document">
              <PlusIcon />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {WORKSPACE.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.active}>
                      <item.icon /> {item.title}
                    </SidebarMenuButton>
                    {/* Badge and action are both positioned against the end of
                        the row, so only one can hold it: the count gives way to
                        the menu on hover. */}
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
                {/* What a menu row looks like before its data arrives. */}
                <SidebarMenuItem>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Support</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LifebuoyIcon /> Help centre
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <SidebarMenuButton size="lg" render={<DropdownMenuTrigger />}>
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
                <DropdownMenuContent side="top" align="start">
                  <DropdownMenuItem>
                    <UserIcon /> Account
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <SignOutIcon /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="p-4">
        <p className="text-sm text-muted-foreground">
          Nine documents updated since Monday.
        </p>
      </SidebarInset>
    </SidebarProvider>
  )
}
