import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  paginationRange,
} from "@diametral/ui/components/pagination"

const TOTAL = 42

export default function PaginationLongRange() {
  const [page, setPage] = React.useState(21)

  const goTo = (number: number) => (event: React.MouseEvent) => {
    event.preventDefault()
    setPage(Math.min(TOTAL, Math.max(1, number)))
  }

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`#page-${Math.max(1, page - 1)}`}
              onClick={goTo(page - 1)}
            />
          </PaginationItem>
          {paginationRange({ page, pageCount: TOTAL }).map((entry, index) =>
            entry === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={entry}>
                <PaginationLink
                  href={`#page-${entry}`}
                  isActive={entry === page}
                  onClick={goTo(entry)}
                >
                  {entry}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              href={`#page-${Math.min(TOTAL, page + 1)}`}
              onClick={goTo(page + 1)}
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
