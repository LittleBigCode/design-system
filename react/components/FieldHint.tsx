import { cx } from "../lib/cx.js";
import React from "react";

import type { HTMLAttributes, ReactNode } from "react";

export interface FieldHintProps extends HTMLAttributes<HTMLSpanElement> {
  /** Color modifier for validation state. */
  status?: "error" | "success";
  children?: ReactNode;
}
const h = React.createElement;

/* ---- FieldHint ----------------------------------------------------------
   Helper / validation text under a field (.ds-field__hint). `status` of
   "error" or "success" adds the matching color modifier. */
export function FieldHint({ status, className, children, ...rest }: FieldHintProps) {
  return h("span", {
    className: cx("ds-field__hint", status && `ds-field__hint--${status}`, className),
    ...rest,
  }, children);
}
