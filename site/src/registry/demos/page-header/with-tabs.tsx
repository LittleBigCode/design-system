import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderIcon,
  PageHeaderTabs,
  PageHeaderTitle,
  Tabs,
} from "@diametral/design-system/react"
import { BellIcon } from "@phosphor-icons/react"

const VIEWS = [
  {
    id: "all",
    label: "All",
    content: (
      <p className="pt-4 text-sm text-muted-foreground">
        Every notification, newest first.
      </p>
    ),
  },
  {
    id: "mentions",
    label: "Mentions",
    content: (
      <p className="pt-4 text-sm text-muted-foreground">
        Comments and reviews that mention you.
      </p>
    ),
  },
  {
    id: "unread",
    label: "Unread",
    content: (
      <p className="pt-4 text-sm text-muted-foreground">
        Nothing left to catch up on.
      </p>
    ),
  },
]

/* PageHeaderTabs is only a slot marker: its presence is what flips
   .ds-page-header's `:has()` rule so the bottom rule sits flush under the strip
   rather than under the title row. Tabs is the incumbent — one component with
   an `items` array — until batch 7 lands the source's parts. */
export default function PageHeaderWithTabs() {
  return (
    <PageHeader className="w-full">
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
        <Tabs items={VIEWS} defaultValue="all" />
      </PageHeaderTabs>
    </PageHeader>
  )
}
