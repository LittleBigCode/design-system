import { cx } from "../lib/cx.js";
import React from "react";

import type {
  HTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Render a fully boxed bar (1px all around) instead of just a bottom rule. */
  bordered?: boolean;
}
const h = React.createElement;

/* ---- Toolbar ------------------------------------------------------------
   A horizontal action bar. Children are laid out in a flex row — drop in
   buttons, a Segmented control, or a search Input directly, and use
   `ToolbarGroup` to cluster related controls and `ToolbarSpacer` to push the
   rest to the far edge. Set `bordered` for a fully boxed bar. */
export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
  { bordered, className, children, ...rest }, ref
) {
  return h("div", {
    ref,
    role: "toolbar",
    className: cx("ds-toolbar", bordered && "ds-toolbar--bordered", className),
    ...rest,
  }, children);
});

/* A cluster of related controls held together with a tight gap. */
export const ToolbarGroup = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function ToolbarGroup(
  { className, children, ...rest }, ref
) {
  return h("div", {
    ref,
    className: cx("ds-toolbar__group", className),
    ...rest,
  }, children);
});

/* A flexible gap that pushes following items to the opposite edge. */
export const ToolbarSpacer = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function ToolbarSpacer(
  { className, ...rest }, ref
) {
  return h("div", {
    ref,
    "aria-hidden": "true",
    className: cx("ds-toolbar__spacer", className),
    ...rest,
  });
});
