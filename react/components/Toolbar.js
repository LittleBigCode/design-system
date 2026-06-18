import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Toolbar ------------------------------------------------------------
   A horizontal action bar. Children are laid out in a flex row — drop in
   buttons, a Segmented control, or a search Input directly, and use
   `ToolbarGroup` to cluster related controls and `ToolbarSpacer` to push the
   rest to the far edge. Set `bordered` for a fully boxed bar. */
export const Toolbar = React.forwardRef(function Toolbar(
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
export const ToolbarGroup = React.forwardRef(function ToolbarGroup(
  { className, children, ...rest }, ref
) {
  return h("div", {
    ref,
    className: cx("ds-toolbar__group", className),
    ...rest,
  }, children);
});

/* A flexible gap that pushes following items to the opposite edge. */
export const ToolbarSpacer = React.forwardRef(function ToolbarSpacer(
  { className, ...rest }, ref
) {
  return h("div", {
    ref,
    "aria-hidden": "true",
    className: cx("ds-toolbar__spacer", className),
    ...rest,
  });
});
