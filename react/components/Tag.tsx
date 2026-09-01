import { cx } from "../lib/cx.js";
import React from "react";

import type {
  HTMLAttributes,
  ReactNode,
  MouseEvent,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Status family — colored border, matching text and tinted background. */
  status?: "info" | "success" | "warning" | "danger";
  /** Render a trailing × button; called when it is clicked. */
  onRemove?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}
const h = React.createElement;

/* ---- Tag / Label ---------------------------------------------------------
   A small inline uppercase pill. Pass a `status` for a colored, tinted
   variant. When `onRemove` is provided a trailing × button is rendered and
   the tag gains room for it; the handler fires on click. Children are the
   label content; extra props spread onto the root <span>. */
export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { status, onRemove, className, children, ...rest }, ref
) {
  return h("span", {
    ref,
    className: cx(
      "ds-tag",
      status && `ds-tag--${status}`,
      onRemove && "ds-tag--removable",
      className
    ),
    ...rest,
  },
    children,
    onRemove
      ? h("button", {
          className: "ds-tag__remove",
          type: "button",
          "aria-label": "Remove",
          onClick: onRemove,
        }, "×")
      : null
  );
});
