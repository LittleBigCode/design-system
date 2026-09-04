import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Dropdown,
  IconButton,
  MenuItem,
} from "@diametral/design-system/react"

/* The collapsed middle of the trail opens a menu. Dropdown and IconButton are
   the incumbents until batch 7 lands the source's DropdownMenu parts. */
export default function BreadcrumbOverflowMenu() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#breadcrumb">Diametral</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Dropdown
            align="start"
            trigger={
              <IconButton size="icon-sm" label="Show the levels between">
                <BreadcrumbEllipsis />
              </IconButton>
            }
          >
            <MenuItem>Brand</MenuItem>
            <MenuItem>Guidelines</MenuItem>
            <MenuItem>2026</MenuItem>
          </Dropdown>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#breadcrumb">Print</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>charte-2026.pdf</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
