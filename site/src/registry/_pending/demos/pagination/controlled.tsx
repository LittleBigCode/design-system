import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@diametral/ui/components/pagination"

const TOTAL = 5

export default function PaginationControlled() {
  const [page, setPage] = React.useState(2)

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`#page-${Math.max(1, page - 1)}`}
              onClick={(event) => {
                event.preventDefault()
                setPage((current) => Math.max(1, current - 1))
              }}
            />
          </PaginationItem>
          {Array.from({ length: TOTAL }, (_, index) => index + 1).map(
            (number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  href={`#page-${number}`}
                  isActive={number === page}
                  onClick={(event) => {
                    event.preventDefault()
                    setPage(number)
                  }}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              href={`#page-${Math.min(TOTAL, page + 1)}`}
              onClick={(event) => {
                event.preventDefault()
                setPage((current) => Math.min(TOTAL, current + 1))
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <p className="text-sm text-muted-foreground">
        Page {page} of {TOTAL}
      </p>
    </div>
  )
}
