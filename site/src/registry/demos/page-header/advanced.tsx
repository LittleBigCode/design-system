import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderTitle,
} from "@diametral/design-system/react"
import { PlusIcon } from "@phosphor-icons/react"

export default function PageHeaderAdvanced() {
  return (
    <PageHeader className="w-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Workspace</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Members</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageHeaderHeading>
        <div className="flex flex-col gap-1">
          <PageHeaderTitle>Members</PageHeaderTitle>
          <PageHeaderDescription>
            Manage who has access to this workspace.
          </PageHeaderDescription>
        </div>
        <PageHeaderActions>
          <Button size="sm">
            <PlusIcon /> Invite
          </Button>
        </PageHeaderActions>
      </PageHeaderHeading>
    </PageHeader>
  )
}
