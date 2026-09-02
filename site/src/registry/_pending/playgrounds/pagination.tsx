import type { ComponentProps } from "react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@diametral/ui/components/pagination"

// The controls drive one link: `isActive` and `size` are what a page number
// exposes, while the nav itself takes nothing.
export default function PaginationPlayground(
  props: ComponentProps<typeof PaginationLink>
) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#playground" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#playground">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#playground" {...props}>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#playground" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
