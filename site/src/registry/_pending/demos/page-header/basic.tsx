import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderTitle,
} from "@diametral/ui/components/page-header"

export default function PageHeaderBasic() {
  return (
    <PageHeader className="w-full">
      <PageHeaderHeading>
        <div className="flex flex-col gap-1">
          <PageHeaderTitle>Members</PageHeaderTitle>
          <PageHeaderDescription>
            Manage who has access to this workspace.
          </PageHeaderDescription>
        </div>
      </PageHeaderHeading>
    </PageHeader>
  )
}
