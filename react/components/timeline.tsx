"use client"

import * as React from "react"

import { cx } from "../lib/cx.js"
import { variants } from "../lib/variants.js"

/* Timeline — an ordered list of events on a rail.
   ---------------------------------------------------------------------------
   0.x took an `items` array with `time`/`title`/`body`. These are parts, which
   is what lets an item's content be a Card, a diff, an avatar row.

   Tone sits on the item, not the indicator: a timeline's semantics are
   per-event ("this deploy failed"), and the indicator is the only slot that can
   carry colour without competing with the content's own type styles. Unset
   leaves the rail on --ds-accent.

   The source kept `pb-8` and `last:pb-0` literal Tailwind classes so a demo
   could override them with `pb-4`. Baked into timeline.css; the override is
   --ds-timeline-gap, settable on an item or on the list. */
const timelineItemVariants = variants("ds-timeline-item", {
  variants: {
    tone: {
      neutral: "ds-timeline-item--neutral",
      info: "ds-timeline-item--info",
      success: "ds-timeline-item--success",
      warning: "ds-timeline-item--warning",
      danger: "ds-timeline-item--danger",
      critical: "ds-timeline-item--critical",
    },
  },
})

type TimelineTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "critical"

function Timeline({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="timeline"
      className={cx("ds-timeline", className)}
      {...props}
    />
  )
}

function TimelineItem({
  className,
  tone,
  ...props
}: React.ComponentProps<"li"> & { tone?: TimelineTone }) {
  return (
    <li
      data-slot="timeline-item"
      className={timelineItemVariants({ tone, className })}
      {...props}
    />
  )
}

function TimelineIndicator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-indicator"
      className={cx("ds-timeline-indicator", className)}
      {...props}
    />
  )
}

function TimelineContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-content"
      className={cx("ds-timeline-content", className)}
      {...props}
    />
  )
}

function TimelineTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-title"
      className={cx("ds-timeline-title", className)}
      {...props}
    />
  )
}

function TimelineDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="timeline-description"
      className={cx("ds-timeline-description", className)}
      {...props}
    />
  )
}

function TimelineTime({ className, ...props }: React.ComponentProps<"time">) {
  return (
    <time
      data-slot="timeline-time"
      className={cx("ds-timeline-time", className)}
      {...props}
    />
  )
}

export {
  Timeline,
  TimelineItem,
  TimelineIndicator,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  timelineItemVariants,
}
export type { TimelineTone }