import { BellIcon } from "@phosphor-icons/react"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderIcon,
  PageHeaderTabs,
  PageHeaderTitle,
} from "@diametral/ui/components/page-header"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@diametral/ui/components/tabs"

export default function PageHeaderWithTabs() {
  return (
    <Tabs defaultValue="all" className="w-full">
      <PageHeader>
        <PageHeaderHeading>
          <div className="flex items-start gap-3">
            <PageHeaderIcon>
              <BellIcon />
            </PageHeaderIcon>
            <div className="flex flex-col gap-1">
              <PageHeaderTitle>Notifications</PageHeaderTitle>
              <PageHeaderDescription>
                Recent activity across your workspace.
              </PageHeaderDescription>
            </div>
          </div>
        </PageHeaderHeading>
        <PageHeaderTabs>
          <TabsList variant="line">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="mentions">Mentions</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
        </PageHeaderTabs>
      </PageHeader>
      <TabsContent value="all" className="pt-4 text-sm text-muted-foreground">
        Every notification, newest first.
      </TabsContent>
      <TabsContent
        value="mentions"
        className="pt-4 text-sm text-muted-foreground"
      >
        Comments and reviews that mention you.
      </TabsContent>
      <TabsContent
        value="unread"
        className="pt-4 text-sm text-muted-foreground"
      >
        Nothing left to catch up on.
      </TabsContent>
    </Tabs>
  )
}
