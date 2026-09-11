"use client";

import * as React from "react";

import { cx } from "../lib/cx.js";

/* Label — a standalone <label> for a control that does not wrap its own text.
   ---------------------------------------------------------------------------
   Distinct from `Field`, which is the label-plus-control row, and from
   `.ds-checkbox`, which is itself a <label> around its own text. Reach for this
   when the control and its name are separate elements — a Base UI switch beside
   its caption, a label whose `htmlFor` points at an input further down a grid.
   The micro-caps voice and the two cases that override it live in label.css. */
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label data-slot="label" className={cx("ds-label", className)} {...props} />
  );
}

export { Label };
