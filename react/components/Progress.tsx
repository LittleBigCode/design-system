import { cx } from "../lib/cx.js";
import React from "react";

import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Current value. Ignored when `indeterminate`. Defaults to 0. */
  value?: number;
  /** Maximum value. Defaults to 100. */
  max?: number;
  /** Status family that recolors the bar. */
  status?: "success" | "warning" | "danger";
  /** Animate a sliding segment instead of a fixed fill. */
  indeterminate?: boolean;
  /** Optional caption row above the track (with the percentage). */
  label?: ReactNode;
}
const h = React.createElement;

/* ---- Progress ------------------------------------------------------------
   A determinate or indeterminate progress bar. `value`/`max` set the fill;
   `status` recolors the bar; `indeterminate` animates a sliding segment.
   When `label` is given, a caption row with the percentage renders above. */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { value = 0, max = 100, status, indeterminate = false, label, className, ...rest }, ref
) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  const rounded = Math.round(pct);

  const aria: Record<string, any> = indeterminate
    ? { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": max }
    : {
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": max,
        "aria-valuenow": value,
      };
  if (label != null) aria["aria-label"] = typeof label === "string" ? label : undefined;
  // A role="progressbar" needs an accessible name. If none is supplied (no
  // string label, no caller aria-label/aria-labelledby), fall back to a generic
  // one so assistive tech announces it.
  if (aria["aria-label"] == null && rest["aria-label"] == null && rest["aria-labelledby"] == null) {
    aria["aria-label"] = "Progress";
  }

  return h(React.Fragment, null,
    label != null
      ? h("div", { className: "ds-progress__label" },
          h("span", null, label),
          indeterminate
            ? null
            : h("span", { className: "ds-progress__value" }, `${rounded}%`)
        )
      : null,
    h("div", {
      ref,
      className: cx(
        "ds-progress",
        status && `ds-progress--${status}`,
        indeterminate && "ds-progress--indeterminate",
        className
      ),
      ...aria,
      ...rest,
    },
      h("div", {
        className: "ds-progress__bar",
        style: indeterminate ? undefined : { width: `${pct}%` },
      })
    )
  );
});
