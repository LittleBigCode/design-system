"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

import { bcx } from "../lib/baseClass.js"
import { variants } from "../lib/variants.js"

/* Progress — a determinate task bar.
   ---------------------------------------------------------------------------
   Base UI's Progress underneath, so `value={null}` is the indeterminate state
   and the ARIA is the primitive's rather than hand-written — which is what 0.x's
   --indeterminate modifier and hand-rolled role=progressbar were standing in
   for.

   `<Progress>` renders its own track and indicator, because a caller composing
   it never gets a handle on the indicator: tone therefore rides on the root as
   --tone and the indicator reads it. Same shape meter.tsx landed in batch 3.
   Declared through `variants()` rather than cva (ADR 0001). */
const progressVariants = variants("ds-progress", {
  variants: {
    tone: {
      neutral: "ds-progress--tone-neutral",
      success: "ds-progress--tone-success",
      warning: "ds-progress--tone-warning",
      danger: "ds-progress--tone-danger",
      critical: "ds-progress--tone-critical",
      info: "ds-progress--tone-info",
    },
  },
})

type ProgressTone =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "critical"
  | "info"

function Progress({
  className,
  children,
  value,
  tone,
  ...props
}: ProgressPrimitive.Root.Props & { tone?: ProgressTone }) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={bcx(progressVariants({ tone }), className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      className={bcx("ds-progress-track", className)}
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={bcx("ds-progress-indicator", className)}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      className={bcx("ds-progress-label", className)}
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      className={bcx("ds-progress-value", className)}
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
  progressVariants,
}
export type { ProgressTone }
