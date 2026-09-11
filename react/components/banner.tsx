"use client"

import * as React from "react"

import { cx } from "../lib/cx.js"
import { variants } from "../lib/variants.js"

/* Banner — a full-width notice with a tone axis.
   ---------------------------------------------------------------------------
   0.11's Banner was the pale-yellow strip and nothing else. `tone` rides the
   same six-tone family every other status surface here takes, so a notice can
   say what kind of notice it is; `neutral` is the default rather than warning,
   because a banner that is always shouting is a banner nobody reads.

   `bannerVariants` is exported and declared through `variants()` rather than
   cva (ADR 0001) — the shape is kept so the docs site's build-time playground
   extractor still finds the axis. */
const bannerVariants = variants("ds-banner", {
  variants: {
    tone: {
      neutral: "ds-banner--neutral",
      info: "ds-banner--info",
      success: "ds-banner--success",
      warning: "ds-banner--warning",
      danger: "ds-banner--danger",
      critical: "ds-banner--critical",
    },
  },
  defaultVariants: { tone: "neutral" },
})

type BannerTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "critical"

function Banner({
  className,
  tone = "neutral",
  ...props
}: React.ComponentProps<"div"> & { tone?: BannerTone }) {
  return (
    <div
      data-slot="banner"
      role="status"
      className={bannerVariants({ tone, className })}
      {...props}
    />
  )
}

function BannerContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="banner-content"
      className={cx("ds-banner-content", className)}
      {...props}
    />
  )
}

function BannerTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="banner-title"
      className={cx("ds-banner-title", className)}
      {...props}
    />
  )
}

/* No opacity here on purpose: the tone inks clear AA as bare text, but fading
   them toward the tint drags contrast back under 4.5:1 — warning on dark
   measured 4.35:1 at 90%. BannerTitle's weight carries the hierarchy instead. */
function BannerDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="banner-description"
      className={cx(className)}
      {...props}
    />
  )
}

function BannerAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="banner-action"
      className={cx("ds-banner-action", className)}
      {...props}
    />
  )
}

export {
  Banner,
  BannerContent,
  BannerTitle,
  BannerDescription,
  BannerAction,
  bannerVariants,
}
export type { BannerTone }