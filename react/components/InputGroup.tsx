import { cx } from "../lib/cx.js";
import React from "react";

import type { HTMLAttributes, ReactNode } from "react";

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Addon rendered before the control. */
  before?: ReactNode;
  /** Addon rendered after the control. */
  after?: ReactNode;
  /** The control (Input, native input/select, ...). */
  children?: ReactNode;
}
const h = React.createElement;

/* ---- InputGroup ---------------------------------------------------------
   Glues addons to a control so they share borders (.ds-input-group). `before`
   and/or `after` render as .ds-input-group__addon; `children` is the control
   (an <Input>, native <input>/<select>, etc.). */
export function InputGroup({ before, after, className, children, ...rest }: InputGroupProps) {
  return h("div", { className: cx("ds-input-group", className), ...rest },
    before != null ? h("span", { className: "ds-input-group__addon" }, before) : null,
    children,
    after != null ? h("span", { className: "ds-input-group__addon" }, after) : null
  );
}
