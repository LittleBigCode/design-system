"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cx } from "../lib/cx.js"
import { variants } from "../lib/variants.js"

/* Bubble — the speech-bubble surface a Message wraps around its text. Seven
   variants, all keyed off `data-variant` on the root, which is why the source's
   three cva() calls carried empty option values: class-variance-authority is
   not acquired (ADR 0001, batch 1) and it bought nothing here. The one axis the
   docs playground drives is re-declared through `variants()`
   (react/lib/variants.ts), which keeps the cva-shaped block the site's
   build-time extractor reads.

   The `gap-2` dedupe exception is resolved rather than carried: it was a
   literal Tailwind utility on BubbleGroup's own className so tailwind-merge
   could dedupe it against the "with reactions" demo's `gap-6`. It is a real
   declaration in bubble.css now, and the loose case is `.ds-bubble-group--loose`. */
function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-group"
      className={cx("ds-bubble-group", className)}
      {...props}
    />
  )
}

type BubbleVariant =
  | "default"
  | "secondary"
  | "muted"
  | "tinted"
  | "outline"
  | "ghost"
  | "destructive"

const bubbleVariants = variants("ds-bubble", {
  variants: {
    variant: {
      default: "",
      secondary: "",
      muted: "",
      tinted: "",
      outline: "",
      ghost: "",
      destructive: "",
    },
  },
  defaultVariants: { variant: "default" },
})

function Bubble({
  variant = "default",
  align = "start",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: BubbleVariant
  align?: "start" | "end"
}) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={bubbleVariants({ variant, className })}
      {...props}
    />
  )
}

function BubbleContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cx("ds-bubble-content", className),
      },
      props,
    ),
    render,
    state: {
      slot: "bubble-content",
    },
  })
}

function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "end"
  side?: "top" | "bottom"
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cx("ds-bubble-reactions", className)}
      {...props}
    />
  )
}

export { BubbleGroup, Bubble, BubbleContent, BubbleReactions }
export type { BubbleVariant }
