"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cx } from "../lib/cx.js"
import { variants } from "../lib/variants.js"

/* Marker — a small uppercase label that marks a position in a stream: "Today",
   "Unread", "3 new". Polymorphic through Base UI's useRender, so the same
   marker can be a div, a heading or a link.

   `markerVariants` is exported, so it survives the drop of
   class-variance-authority: every option value was an empty string — the
   styling is keyed off `data-variant`, which useRender derives from `state`
   below — so cva bought nothing here, and `variants()` (react/lib/variants.ts)
   keeps the export callable and the axes readable by the docs site's
   build-time playground extractor. Same call batch 1 made for
   navigation-menu. */
const markerVariants = variants("ds-marker", {
  variants: {
    variant: { default: "", separator: "", border: "" },
  },
  defaultVariants: { variant: "default" },
})

function Marker({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  variant?: "default" | "separator" | "border"
}) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: markerVariants({ variant, className }),
      },
      props,
    ),
    render,
    state: {
      slot: "marker",
      variant,
    },
  })
}

function MarkerIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-icon"
      aria-hidden="true"
      className={cx("ds-marker-icon", className)}
      {...props}
    />
  )
}

function MarkerContent({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-content"
      className={cx("ds-marker-content", className)}
      {...props}
    />
  )
}

export { Marker, MarkerIcon, MarkerContent, markerVariants }
