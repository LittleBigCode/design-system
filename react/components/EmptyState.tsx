import { cx } from "../lib/cx.js";
import React from "react";

import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Large faint icon (glyph or SVG node). */
  icon?: ReactNode;
  /** Title-voiced heading. */
  title?: ReactNode;
  /** Soft, width-constrained supporting copy. */
  description?: ReactNode;
  /** Action row rendered beneath the description. */
  actions?: ReactNode;
}
const h = React.createElement;

/* ---- EmptyState ---------------------------------------------------------- */
/* A centered placeholder for empty / zero-result / first-run screens. `icon` is
   any node (glyph or SVG), `title` and `description` the copy, and `actions`
   (or `children`) the action row beneath. */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
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
