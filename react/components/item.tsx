"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { bcx } from "../lib/baseClass.js"
import { cx } from "../lib/cx.js"
import { variants } from "../lib/variants.js"
import { Separator } from "./separator.js"

/* Item — a row of content: media, title, description, actions, with an optional
   header and footer band. Three variants, three sizes, and polymorphic through
   Base UI's useRender, so the same row can be a div, a link or a button.

   `Item` is why `separator` moved into this batch. `item.tsx` imports
   `Separator`, and unlike the sixteen other forward cross-batch imports there
   was no target symbol to re-compose onto — this repo had no `Separator` and no
   `.ds-separator` rule anywhere. Both are net-new additions in adjacent
   batches, so landing them together dissolves the import instead of re-wiring
   it twice.

   class-variance-authority is not acquired (ADR 0001, batch 1), so the two
   variant maps below go through `variants()` (react/lib/variants.ts) instead.
   These were the only two real cva calls in this batch — every other one
   carried empty option values. The declaration stays cva-shaped because the
   docs site parses these axes at build time to drive the playground panel. */
function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    // Deliberately no role="list". A list may only own listitems, and Item is
    // polymorphic through Base UI's useRender — which does not forward `role`
    // to the rendered element, so its children cannot be made listitems from
    // here. Asserting the role anyway is what produced axe's critical
    // aria-required-children on every group. A generic container is honest; a
    // malformed list is announced unpredictably by screen readers. Consumers
    // who genuinely need list semantics own the markup: pass role="list" here
    // and role="listitem" on each child.
    <div
      data-slot="item-group"
      className={cx("ds-item-group", className)}
      {...props}
    />
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={bcx("ds-item-separator", className)}
      {...props}
    />
  )
}

type ItemVariant = "default" | "outline" | "muted"
type ItemSize = "default" | "sm" | "xs"

const itemVariants = variants("ds-item", {
  variants: {
    variant: {
      default: "ds-item--default",
      outline: "ds-item--outline",
      muted: "ds-item--muted",
    },
    size: {
      default: "ds-item--size-default",
      sm: "ds-item--size-sm",
      xs: "ds-item--size-xs",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
})

function Item({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  variant?: ItemVariant
  size?: ItemSize
}) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: itemVariants({ variant, size, className }),
      },
      props,
    ),
    render,
    state: {
      slot: "item",
      variant,
      size,
    },
  })
}

type ItemMediaVariant = "default" | "icon" | "image"

const itemMediaVariants = variants("ds-item-media", {
  variants: {
    variant: {
      default: "ds-item-media--default",
      icon: "ds-item-media--icon",
      image: "ds-item-media--image",
    },
  },
  defaultVariants: { variant: "default" },
})

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: ItemMediaVariant }) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={itemMediaVariants({ variant, className })}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cx("ds-item-content", className)}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cx("ds-item-title", className)}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cx("ds-item-description", className)}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cx("ds-item-actions", className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cx("ds-item-header", className)}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cx("ds-item-footer", className)}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
