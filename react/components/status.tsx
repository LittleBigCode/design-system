"use client"

import * as React from "react"

import { cx } from "../lib/cx.js"
import { variants } from "../lib/variants.js"

/* Status — two components, and the batch's one export rename.
   ---------------------------------------------------------------------------
   0.11's `Status` is a **panel**: a solid coloured head, a legend strip, metric
   rows, a note. The source's is an **inline indicator**: a small square and a
   label, the thing that sits in a table cell saying "running". They are not the
   same component and both are wanted.

   In CSS they can share `.ds-status`, told apart by what they contain (see
   `status-panel.css`). In React they cannot share a symbol, and the ledger
   gives `Status` to the source. So the panel is renamed **`StatusPanel`** — the
   name its props interface (`StatusPanelProps`) and its stylesheet
   (`status-panel.css`) already used — and `Status`/`StatusIndicator`/
   `StatusLabel` are the absorbed inline set.

   `<ds-status>` is untouched. The web component is the panel, it writes its own
   classes, and no consumer of it has to change anything.

   `Metric` travels with the panel: it is what fills the panel's body, it has no
   source counterpart, and `status-panel.css` defines both. */

export type StatusTone =
  | "success"
  | "warning"
  | "danger"
  | "critical"
  | "neutral"
  | "info"

/* Sets --tone for the square and the label to share; the six tones mirror the
   family tag, banner and alert use, so a status reading "danger" is the same
   colour everywhere in the system. */
const statusVariants = variants("ds-status", {
  variants: {
    tone: {
      success: "ds-status--success",
      warning: "ds-status--warning",
      danger: "ds-status--danger",
      critical: "ds-status--critical",
      neutral: "ds-status--neutral",
      info: "ds-status--info",
    },
  },
  defaultVariants: { tone: "neutral" },
})

function Status({
  className,
  tone = "neutral",
  ...props
}: React.ComponentProps<"span"> & { tone?: StatusTone }) {
  return (
    <span
      data-slot="status"
      className={statusVariants({ tone, className })}
      {...props}
    />
  )
}

function StatusIndicator({
  className,
  pulse,
  ...props
}: React.ComponentProps<"span"> & { pulse?: boolean }) {
  return (
    <span
      data-slot="status-indicator"
      aria-hidden="true"
      className={cx("ds-status-indicator", className)}
      {...props}
    >
      {pulse ? <span className="ds-status-indicator-ping" /> : null}
    </span>
  )
}

function StatusLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="status-label"
      className={cx("ds-status-label", className)}
      {...props}
    />
  )
}

/* ---- The panel, renamed from `Status` ------------------------------------ */

export interface StatusPanelProps extends React.ComponentProps<"div"> {
  status?: StatusTone
  kicker?: React.ReactNode
  heading?: React.ReactNode
  subtitle?: React.ReactNode
}

function StatusPanel({
  status = "neutral",
  kicker,
  heading,
  subtitle,
  className,
  children,
  ...rest
}: StatusPanelProps) {
  return (
    <div className={cx("ds-status", `ds-status--${status}`, className)} {...rest}>
      <div className="ds-status__head">
        {kicker != null ? <div className="ds-status__kicker">{kicker}</div> : null}
        {heading != null ? <div className="ds-status__title">{heading}</div> : null}
        {subtitle != null ? <div className="ds-status__subtitle">{subtitle}</div> : null}
      </div>
      {children}
    </div>
  )
}

export interface MetricProps {
  label: React.ReactNode
  value: React.ReactNode
  variant?: "hero" | "sub"
  /** Sign of the value: > 0 colors it success, < 0 colors it danger. */
  sign?: number
  className?: string
}

function Metric({ label, value, variant, sign, className }: MetricProps) {
  const tone = (sign ?? 0) > 0 ? "is-pos" : (sign ?? 0) < 0 ? "is-neg" : null
  return (
    <div className={cx("ds-metric", variant && `ds-metric--${variant}`, className)}>
      <span className="ds-metric__k">{label}</span>
      <span className={cx("ds-metric__v", tone)}>{value}</span>
    </div>
  )
}

export {
  Status,
  StatusIndicator,
  StatusLabel,
  StatusPanel,
  Metric,
  statusVariants,
}