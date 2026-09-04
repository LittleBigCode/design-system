"use client"

import * as React from "react"

import { cx } from "../lib/cx.js"

/* PageHeader — the title block at the top of a view.
   ---------------------------------------------------------------------------
   0.x took `title`, `subtitle`, `actions`, `tabs` and a `flush` flag. These are
   parts, and `flush` is gone: page-header.css derives the same thing with
   `:has([data-slot=page-header-tabs])`, so the tab strip's presence moves the
   bottom rule without anyone declaring it. */
function PageHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="page-header"
      className={cx("ds-page-header", className)}
      {...props}
    />
  )
}

function PageHeaderHeading({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-heading"
      className={cx("ds-page-header-heading", className)}
      {...props}
    />
  )
}

function PageHeaderIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="page-header-icon"
      className={cx("ds-page-header-icon", className)}
      {...props}
    />
  )
}

function PageHeaderTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="page-header-title"
      className={cx("ds-page-header-title", className)}
      {...props}
    />
  )
}

function PageHeaderDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="page-header-description"
      className={cx("ds-page-header-description", className)}
      {...props}
    />
  )
}

function PageHeaderActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-actions"
      className={cx("ds-page-header-actions", className)}
      {...props}
    />
  )
}

/* Only a slot marker: its presence flips PageHeader's `:has()` selector so the
   bottom rule sits flush under the tab strip instead of the title row. */
function PageHeaderTabs({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="page-header-tabs" className={cx(className)} {...props} />
  )
}

export {
  PageHeader,
  PageHeaderHeading,
  PageHeaderIcon,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderActions,
  PageHeaderTabs,
}