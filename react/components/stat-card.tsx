"use client"

import * as React from "react"

import { cx } from "../lib/cx.js"
import { variants } from "../lib/variants.js"

// A dashboard tile: bordered surface, uppercase faint label, a title-voiced
// figure, an optional signed delta and a spark slot — the compound-component
// take on v1's StatCard (css/components/stat-card.css).
function StatCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-card"
      className={cx("ds-stat-card", className)}
      {...props}
    />
  )
}

function StatCardLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-card-label"
      className={cx("ds-stat-card-label", className)}
      {...props}
    />
  )
}

function StatCardValue({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-card-value"
      className={cx("ds-stat-card-value", className)}
      {...props}
    />
  )
}

const statCardDeltaVariants = variants("ds-stat-card-delta", {
  variants: {
    direction: {
      // The `-ink` variants, not the bare tones: --ds-success is tuned as a
      // surface colour and only reaches 3.82:1 on dark's --ds-bg, which fails
      // AA as text. --ds-success-ink is the text-weight value (6.75:1).
      up: "ds-stat-card-delta--up",
      down: "ds-stat-card-delta--down",
    },
  },
})

function StatCardDelta({
  className,
  direction,
  children,
  ...props
}: React.ComponentProps<"div"> & { direction?: "up" | "down" }) {
  return (
    <div
      data-slot="stat-card-delta"
      className={statCardDeltaVariants({ direction, className })}
      {...props}
    >
      {direction && (
        <span aria-hidden="true">{direction === "up" ? "▲" : "▼"}</span>
      )}
      {children}
    </div>
  )
}

function StatCardSpark({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-card-spark"
      className={cx("ds-stat-card-spark", className)}
      {...props}
    />
  )
}

export {
  StatCard,
  StatCardLabel,
  StatCardValue,
  StatCardDelta,
  StatCardSpark,
  statCardDeltaVariants,
}