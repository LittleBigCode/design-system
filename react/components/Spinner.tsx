import { cx } from "../lib/cx.js";
import React from "react";

import type {
  HTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Size variant. Omit for the default (20px) size. */
  size?: "sm" | "lg";
  /** Align to the surrounding text baseline (sits beside a label). */
  inline?: boolean;
  /** Accessible label exposed via aria-label. Defaults to "Loading". */
  label?: string;
}
const h = React.createElement;

/* ---- Spinner -------------------------------------------------------------
   A circular loading indicator. `size` is "sm" | "lg" (default medium).
   Exposes role="status" + an accessible label (default "Loading"). */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size, inline = false, label = "Loading", className, ...rest }, ref
) {
  return h("span", {
    ref,
    role: "status",
    "aria-label": label,
    className: cx(
      "ds-spinner",
      size && `ds-spinner--${size}`,
      inline && "ds-spinner--inline",
      className
    ),
    ...rest,
  });
});
