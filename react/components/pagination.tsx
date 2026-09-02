import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import {
  CaretLeftIcon,
  CaretRightIcon,
  DotsThreeIcon,
} from "@phosphor-icons/react"

import { cx } from "../lib/cx.js"

/**
 * Which page numbers to render, and where the ellipses fall — 0.11's
 * `pageCount` + `siblingCount` window, as a pure function rather than a prop,
 * so the parts API is untouched and the caller still owns every link.
 *
 * `page` is 1-based. The first and last page are always present, so the run has
 * a stable length and the control does not resize as you walk it.
 */
function paginationRange({
  page,
  pageCount,
  siblingCount = 1,
}: {
  page: number
  pageCount: number
  siblingCount?: number
}): (number | "ellipsis")[] {
  // first + last + current + 2 siblings + 2 ellipses
  const slots = siblingCount * 2 + 5
  if (pageCount <= slots) return range(1, pageCount)

  const left = Math.max(page - siblingCount, 1)
  const right = Math.min(page + siblingCount, pageCount)

  // An ellipsis standing in for one page is a lie that costs a click, so it
  // only appears with at least two pages behind it. Near an edge that leaves a
  // gap, and the run there is widened rather than shortened — otherwise the
  // control would be 4 slots wide on page 1 and 7 in the middle, resizing under
  // the pointer as you walk it.
  const showLeft = left >= 4
  const showRight = right <= pageCount - 3
  const edgeRun = siblingCount * 2 + 3

  if (!showLeft) return [...range(1, edgeRun), "ellipsis", pageCount]
  if (!showRight) {
    return [1, "ellipsis", ...range(pageCount - edgeRun + 1, pageCount)]
  }
  return [1, "ellipsis", ...range(left, right), "ellipsis", pageCount]
}

const range = (from: number, to: number) =>
  from > to ? [] : Array.from({ length: to - from + 1 }, (_, i) => from + i)

/* Pagination — a page strip built from links.
   ---------------------------------------------------------------------------
   0.11's Pagination was controlled: `page`, `pageCount`, `onChange`, and it
   rendered every button for you. These are parts, so a page can be a real <a
   href> — which the incumbent could not do, and which is what makes a pager
   crawlable and middle-clickable. The window logic is not lost: it is
   `paginationRange` above, exported, and the recipe for rebuilding the
   controlled component out of it is in docs/migration/from-0.11.md.

   CROSS-BATCH: the source composes PaginationLink onto its own `Button`, whose
   `render` + `tone` API arrives in batch 7. The incumbent Button is a class
   applier with no `render`, and it lives in react/index.tsx — importing it here
   would be a cycle. So the link applies `.ds-button`'s classes directly, which
   is the same visual contract, and batch 7 re-wires it to the symbol. */
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cx("ds-pagination", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cx("ds-pagination-content", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

function PaginationLink({
  className,
  isActive,
  size = "icon",
  render,
  ...props
}: useRender.ComponentProps<"a"> & {
  isActive?: boolean
  size?: "icon" | "default"
}) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cx(
          "ds-button",
          isActive && "ds-button--primary",
          size === "icon" && "ds-button--icon",
          className,
        ),
        "aria-current": isActive ? "page" : undefined,
      },
      props,
    ),
    render,
    state: { slot: "pagination-link", active: Boolean(isActive) },
  })
}

function PaginationPrevious({
  className,
  text = "Previous",
  children,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cx("ds-pagination-previous", className)}
      {...props}
    >
      <CaretLeftIcon data-icon="inline-start" className="ds-pagination-caret" />
      <span className="ds-pagination-label">{children ?? text}</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  text = "Next",
  children,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cx("ds-pagination-next", className)}
      {...props}
    >
      <span className="ds-pagination-label">{children ?? text}</span>
      <CaretRightIcon data-icon="inline-end" className="ds-pagination-caret" />
    </PaginationLink>
  )
}

/* The gap marker. This package has no `sr-only` utility (carousel.css records
   the same finding), so "More pages" is an aria-label rather than
   visually-hidden text — and the span stays aria-hidden either way, because the
   pages it stands for are not reachable from here. */
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cx("ds-pagination-ellipsis", className)}
      {...props}
    >
      <DotsThreeIcon />
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  paginationRange,
}
