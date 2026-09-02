"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cx } from "../lib/cx.js"

/* Toc — a sticky column of anchors down the side of a long page, indented by
   heading level against a 1px spine.

   Four dedupe exceptions are resolved rather than carried. The source kept
   `sticky top-8`, `mb-3`, `gap-2` and the link's
   `border-transparent text-muted-foreground text-sm` as literal Tailwind
   utilities on these classNames so tailwind-merge could dedupe them against
   consumer overrides. There is no tailwind-merge here, so each literal is a
   real declaration in toc.css and each override is a modifier class:
   `.ds-toc--static`, `.ds-toc-label--tight`, `.ds-toc-list--tight` and
   `.ds-toc-link--current`. `current` is a prop rather than a bare class,
   because the active row also owns `aria-current`. */
function Toc({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="On this page"
      data-slot="toc"
      className={cx("ds-toc", className)}
      {...props}
    />
  )
}

function TocLabel({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="toc-label"
      className={cx("ds-toc-label", className)}
      {...props}
    />
  )
}

function TocList({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="toc-list"
      className={cx("ds-toc-list", className)}
      {...props}
    />
  )
}

function TocItem({
  className,
  level = 1,
  ...props
}: React.ComponentProps<"li"> & { level?: 1 | 2 }) {
  return (
    <li
      data-slot="toc-item"
      data-level={level}
      className={cx(className)}
      {...props}
    />
  )
}

function TocLink({
  className,
  current,
  render,
  ...props
}: useRender.ComponentProps<"a"> & { current?: boolean }) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        "aria-current": current ? ("location" as const) : undefined,
        className: cx(
          "ds-toc-link",
          current && "ds-toc-link--current",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "toc-link",
    },
  })
}

export { Toc, TocLabel, TocList, TocItem, TocLink }
