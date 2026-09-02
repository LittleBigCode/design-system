import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@diametral/ui/components/pagination"

export default function PaginationBasic() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#pagination" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#pagination">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#pagination" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#pagination">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#pagination">12</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#pagination" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
