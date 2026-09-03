"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { CaretRightIcon, DotsThreeIcon } from "@phosphor-icons/react"

import { cx } from "../lib/cx.js"

/* Breadcrumb — a path trail ending in the current page.
   ---------------------------------------------------------------------------
   0.x took an `items` array and generated the "/" separators as CSS content.
   These are parts, and the separator is a real <li role="presentation"> holding
   a caret: a caret can be flipped for RTL where generated text cannot, and an
   element keeps the slash out of the accessible name of the item beside it.

   `BreadcrumbLink` is polymorphic through Base UI's useRender, so a router's
   own Link renders in its place without a wrapper element. */
function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cx(className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cx("ds-breadcrumb-list", className)}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cx("ds-breadcrumb-item", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      { className: cx("ds-breadcrumb-link", className) },
      props,
    ),
    render,
    state: { slot: "breadcrumb-link" },
  })
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cx("ds-breadcrumb-page", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cx("ds-breadcrumb-separator", className)}
      {...props}
    >
      {children ?? <CaretRightIcon className="ds-breadcrumb-separator-icon" />}
    </li>
  )
}

/* The ellipsis stands in for the collapsed middle of a trail. This package has
   no `sr-only` utility (carousel.css records the same finding), so the name is
   an aria-label on the span rather than visually-hidden text inside it. */
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cx("ds-breadcrumb-ellipsis", className)}
      {...props}
    >
      <DotsThreeIcon />
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}