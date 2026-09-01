import { cx } from "../lib/cx.js";
import React from "react";

import type {
  HTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  /** Shape of the placeholder. Defaults to "line". */
  variant?: "text" | "line" | "circle" | "block";
  /** Inline width override (e.g. "12rem" or 200). */
  width?: number | string;
  /** Inline height override (e.g. "1em" or 40). */
  height?: number | string;
  /** Render N stacked lines (> 1). Defaults to 1. */
  count?: number;
}
const h = React.createElement;

/* ---- Skeleton ------------------------------------------------------------ */
/* A shimmering loading placeholder. `variant` picks the shape
   ("text" | "line" | "circle" | "block"), `width`/`height` override the size
   inline, and `count` (> 1) renders N stacked lines. */
export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  { variant = "line", width, height, count = 1, className, ...rest }, ref
) {
  const cls = cx("ds-skeleton", variant && `ds-skeleton--${variant}`, className);

  const make = (key: any, useRef: any) => h("span", {
    key,
    ref: useRef ? ref : undefined,
    className: cls,
    style: { width, height },
    "aria-hidden": "true",
    ...rest,
  });

  if (count > 1) {
    return h(React.Fragment, null,
      Array.from({ length: count }, (_, i) => make(i, false))
    );
  }
  return make(undefined, true);
});
