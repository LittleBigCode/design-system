import type { ReactNode } from "react"
import { GearIcon, UsersIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderIcon,
  PageHeaderTabs,
  PageHeaderTitle,
} from "@diametral/ui/components/page-header"
import { Tabs, TabsList, TabsTrigger } from "@diametral/ui/components/tabs"

const ICONS = { UsersIcon, GearIcon }

// The panel passes the icon through as a component *name*; `{icon}` below is the
// marker it substitutes as `<UsersIcon />` in the generated snippet, so the
// element has to be built here rather than written inline.
export default function PageHeaderPlayground({
  children,
  icon: iconName = "UsersIcon",
  description = "Manage members, roles and billing.",
  action = "Invite",
}: {
  children?: ReactNode
  icon?: keyof typeof ICONS
  description?: string
  action?: string
}) {
  const IconComponent = ICONS[iconName]
  const icon = <IconComponent />

  return (
    <Tabs defaultValue="members" className="w-full">
      <PageHeader>
        <PageHeaderHeading>
          <div className="flex items-start gap-3">
            <PageHeaderIcon>{icon}</PageHeaderIcon>
            <div className="flex flex-col gap-1">
              <PageHeaderTitle>{children}</PageHeaderTitle>
              <PageHeaderDescription>{description}</PageHeaderDescription>
            </div>
          </div>
          <PageHeaderActions>
            <Button size="sm">{action}</Button>
          </PageHeaderActions>
        </PageHeaderHeading>
        <PageHeaderTabs>
          <TabsList variant="line">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
        </PageHeaderTabs>
      </PageHeader>
    </Tabs>
  )
}
