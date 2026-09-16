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
  PageHeaderHeading,
  PageHeaderTabs,
  PageHeaderTitle,
  Tabs,
} from "@diametral/design-system/react"

const VIEWS = [
  { id: "rates", label: "Rates" },
  { id: "profiles", label: "Profiles" },
  { id: "history", label: "History" },
]

export default function PageHeader01() {
  return (
    <PageHeader>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#page-header-01">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#page-header-01">Pricing</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Matrix</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageHeaderHeading>
        <PageHeaderTitle>Pricing matrix</PageHeaderTitle>
        <PageHeaderActions>
          <Button>Export</Button>
          <Button variant="primary">New rate</Button>
        </PageHeaderActions>
      </PageHeaderHeading>
      {/* PageHeaderTabs is a slot marker: its presence flips the `:has()` rule
          that moves the bottom rule under the strip. */}
      <PageHeaderTabs>
        <Tabs items={VIEWS} defaultValue="rates" />
      </PageHeaderTabs>
    </PageHeader>
  )
}
