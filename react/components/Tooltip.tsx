import { cx } from "../lib/cx.js";
/* ----------------------------------------------------------------------------
   Tooltip — wraps a trigger and shows a small dark .ds-tooltip on hover / focus.
   Positioned with inline styles (simple top / bottom / left / right placement).
   Styling comes from css/components/tooltip.css (global stylesheet).
   ---------------------------------------------------------------------------- */
import React from "react";

import type { HTMLAttributes, ReactNode } from "react";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** The tooltip text shown on hover / focus of the wrapped trigger. */
  label: ReactNode;
  /** Where the tooltip sits relative to the trigger. Defaults to "top". */
  placement?: TooltipPlacement;
  /** The trigger element the tooltip is attached to. */
  children?: ReactNode;
}

const h = React.createElement;

const POS = {
  top:    { left: "50%", bottom: "calc(100% + 8px)", transform: "translateX(-50%)" },
  bottom: { left: "50%", top: "calc(100% + 8px)", transform: "translateX(-50%)" },
  left:   { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
  right:  { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
};

export function Tooltip({ label, placement = "top", className, children, ...rest }: TooltipProps) {
  const [open, setOpen] = React.useState(false);

  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  return h("span", {
    className: cx("ds-tooltip-host", className),
    style: { position: "relative", display: "inline-flex" },
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
    ...rest,
  },
    children,
    open
      ? h("span", {
          className: "ds-tooltip",
          role: "tooltip",
          style: { position: "absolute", width: "max-content", ...POS[placement] },
        }, label)
      : null
  );
}
