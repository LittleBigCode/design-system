import type * as React from "react"

import { cx } from "@diametral/design-system/react"

/**
 * The docs app's own table-of-contents furniture. Local rather than imported
 * from the design system: the harness that verifies a component must not
 * itself be built out of the components under test, or a regression in one
 * takes the gate down with it.
 */

export function Toc({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="On this page"
      className={cx(
        "sticky top-8 flex w-44 flex-col border border-border p-4 text-sm",
        className
      )}
      {...props}
    />
  )
}

export function TocLabel({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cx(
        "mb-3 font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase",
        className
      )}
      {...props}
    />
  )
}

export function TocList({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cx("flex flex-col gap-2", className)} {...props} />
}

export function TocItem({
  className,
  level = 1,
  ...props
}: React.ComponentProps<"li"> & { level?: 1 | 2 }) {
  return (
    <li
      className={cx(level === 2 && "ps-3", className)}
      data-level={level}
      {...props}
    />
  )
}

const LINK =
  "block w-full truncate text-start text-muted-foreground underline-offset-4 " +
  "hover:text-foreground hover:underline aria-pressed:text-foreground " +
  "aria-pressed:font-medium aria-[current=page]:text-foreground"

/**
 * `as="button"` covers the anatomy index, where a row selects a part rather
 * than navigating. The source's polymorphic `render` prop pulled in base-ui for
 * exactly these two shapes, so a union of the two is the whole requirement.
 */
export function TocLink({
  as = "a",
  className,
  ...props
}: { as?: "a" | "button" } & React.ComponentProps<"a"> &
  React.ComponentProps<"button">) {
  if (as === "button") {
    return <button type="button" className={cx(LINK, className)} {...props} />
  }
  return <a className={cx(LINK, className)} {...props} />
}
