import * as React from "react"

import { cx } from "../lib/cx.js"

/* DescriptionList — a two-column key/value grid (auto term column, 1fr detail).
   ---------------------------------------------------------------------------
   `dt`/`dd` pairs flow as consecutive grid children, so a row needs no wrapper
   element. 0.x took an `items` array and rendered the pairs for you; these are
   parts, so a detail cell can hold anything — a Tag, a Snippet, a link. */
function DescriptionList({ className, ...props }: React.ComponentProps<"dl">) {
  return (
    <dl
      data-slot="description-list"
      className={cx("ds-description-list", className)}
      {...props}
    />
  )
}

function DescriptionTerm({ className, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="description-term"
      className={cx("ds-description-term", className)}
      {...props}
    />
  )
}

function DescriptionDetail({ className, ...props }: React.ComponentProps<"dd">) {
  return (
    <dd
      data-slot="description-detail"
      className={cx("ds-description-detail", className)}
      {...props}
    />
  )
}

export { DescriptionList, DescriptionTerm, DescriptionDetail }
