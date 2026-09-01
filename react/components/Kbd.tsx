import { cx } from "../lib/cx.js";
/* ----------------------------------------------------------------------------
   Kbd — an inline <kbd class="ds-kbd"> keycap for keyboard shortcuts.
   A thin idiomatic wrapper: forwards a ref, merges className and spreads the rest
   onto the element. Styling: css/components/kbd.css.
   ---------------------------------------------------------------------------- */
import React from "react";

import type { HTMLAttributes, ForwardRefExoticComponent, RefAttributes } from "react";

export interface KbdProps extends HTMLAttributes<HTMLElement> {}

const h = React.createElement;

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(function Kbd({ className, children, ...rest }, ref) {
  return h("kbd", { ref, className: cx("ds-kbd", className), ...rest }, children);
});
