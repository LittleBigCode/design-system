import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- EmptyState ---------------------------------------------------------- */
/* A centered placeholder for empty / zero-result / first-run screens. `icon` is
   any node (glyph or SVG), `title` and `description` the copy, and `actions`
   (or `children`) the action row beneath. */
export const EmptyState = React.forwardRef(function EmptyState(
  { icon, title, description, actions, className, children, ...rest }, ref
) {
  return h("div", {
    ref,
    className: cx("ds-empty", className),
    ...rest,
  },
    icon != null ? h("div", { className: "ds-empty__icon", "aria-hidden": "true" }, icon) : null,
    title != null ? h("p", { className: "ds-empty__title" }, title) : null,
    description != null ? h("p", { className: "ds-empty__desc" }, description) : null,
    actions != null ? h("div", { className: "ds-empty__actions" }, actions) : null,
    children
  );
});
