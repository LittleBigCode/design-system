import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
} from "@diametral/design-system/react"

/* The collapsed middle of the trail opens a menu, composed from DropdownMenu's
   own parts since batch 13 (#46) — Dropdown/MenuItem retired. */
export default function BreadcrumbOverflowMenu() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#breadcrumb">Diametral</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <IconButton size="icon-sm" label="Show the levels between">
                  <BreadcrumbEllipsis />
                </IconButton>
              }
            />
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Brand</DropdownMenuItem>
              <DropdownMenuItem>Guidelines</DropdownMenuItem>
              <DropdownMenuItem>2026</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
