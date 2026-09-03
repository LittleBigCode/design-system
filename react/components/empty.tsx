"use client"

import * as React from "react"

import { cx } from "../lib/cx.js"
import { variants } from "../lib/variants.js"

/* Empty — the centred block a view shows when it has nothing to show.
   ---------------------------------------------------------------------------
   0.x's EmptyState took `icon`, `title`, `description` and `actions` as props.
   These are parts, which is what lets the media slot hold an illustration and
   the content slot hold a form rather than only a row of buttons.

   The source kept `p-12` a literal Tailwind class on the root for a
   tailwind-merge dedupe. There is no Tailwind here, so the padding is baked
   into .ds-empty and an override is plain CSS. */
const emptyMediaVariants = variants("ds-empty-media", {
  variants: {
    variant: {
      default: "ds-empty-media--default",
      icon: "ds-empty-media--icon",
    },
  },
  defaultVariants: { variant: "default" },
})

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="empty" className={cx("ds-empty", className)} {...props} />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cx("ds-empty-header", className)}
      {...props}
    />
  )
}

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: "default" | "icon" }) {
  return (
    <div
      data-slot="empty-media"
      data-variant={variant}
      className={emptyMediaVariants({ variant, className })}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cx("ds-empty-title", className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={cx("ds-empty-description", className)}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cx("ds-empty-content", className)}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  emptyMediaVariants,
}