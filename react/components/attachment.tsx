"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cx } from "../lib/cx.js"
import { variants } from "../lib/variants.js"
import { IconButton } from "./icon-button.js"

/* Attachment — a file chip: media thumbnail or icon, title, description, and
   actions, in a horizontal or vertical card that reports upload progress
   through `state` (idle / uploading / processing / error / done).

   Two re-wirings, both paid twice by design:

   - `AttachmentAction` was the source's `Button` at `variant="ghost"
     size="icon-xs"`. That is `IconButton` here, whose tone narrows to
     primary|danger and which requires a `label` — an icon-only action needs an
     accessible name, and the source's ghost icon button carried none of its
     own. Batch 7 supplies `Button` and re-wires this back.
   - The source's cva() call carried only the variant *keys* (its option values
     were empty strings — attachment.css keys off `data-size`/`data-orientation`)
     so class-variance-authority is not acquired for it either; `variants()`
     (react/lib/variants.ts) keeps the cva-shaped block the docs site's
     build-time playground extractor reads.

   `scroll-fade-x` and `scrollbar-none` are gone from AttachmentGroup's
   className: both were Tailwind classes with no Tailwind here to define them,
   so they shipped silently doing nothing. Their behaviour is real CSS in
   attachment.css now. */
type AttachmentState = "idle" | "uploading" | "processing" | "error" | "done"

const attachmentVariants = variants("ds-attachment", {
  variants: {
    size: { default: "", sm: "", xs: "" },
    orientation: { horizontal: "", vertical: "" },
  },
  defaultVariants: { size: "default", orientation: "horizontal" },
})

function Attachment({
  className,
  state = "done",
  size = "default",
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"div"> & {
  state?: AttachmentState
  size?: "default" | "sm" | "xs"
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-size={size}
      data-orientation={orientation}
      className={attachmentVariants({ size, orientation, className })}
      {...props}
    />
  )
}

function AttachmentMedia({
  className,
  variant = "icon",
  ...props
}: React.ComponentProps<"div"> & { variant?: "icon" | "image" }) {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      className={cx("ds-attachment-media", className)}
      {...props}
    />
  )
}

function AttachmentContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-content"
      className={cx("ds-attachment-content", className)}
      {...props}
    />
  )
}

function AttachmentTitle({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-title"
      className={cx("ds-attachment-title", className)}
      {...props}
    />
  )
}

function AttachmentDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-description"
      className={cx("ds-attachment-description", className)}
      {...props}
    />
  )
}

function AttachmentActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-actions"
      className={cx("ds-attachment-actions", className)}
      {...props}
    />
  )
}

function AttachmentAction({
  className,
  ...props
}: React.ComponentProps<typeof IconButton>) {
  return (
    <IconButton
      data-slot="attachment-action"
      size="sm"
      className={cx(className)}
      {...props}
    />
  )
}

function AttachmentTrigger({
  className,
  render,
  type,
  ...props
}: useRender.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        type: render ? type : (type ?? "button"),
        className: cx("ds-attachment-trigger", className),
      },
      props,
    ),
    render,
    state: {
      slot: "attachment-trigger",
    },
  })
}

function AttachmentGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-group"
      tabIndex={0}
      className={cx("ds-attachment-group", className)}
      {...props}
    />
  )
}

export {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
}
export type { AttachmentState }
