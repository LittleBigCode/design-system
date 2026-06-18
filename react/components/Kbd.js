/* ----------------------------------------------------------------------------
   Kbd — an inline <kbd class="ds-kbd"> keycap for keyboard shortcuts.
   A thin idiomatic wrapper: forwards a ref, merges className and spreads the rest
   onto the element. Styling: css/components/kbd.css.
   ---------------------------------------------------------------------------- */
import React from "react";

const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

export const Kbd = React.forwardRef(function Kbd({ className, children, ...rest }, ref) {
  return h("kbd", { ref, className: cx("ds-kbd", className), ...rest }, children);
});
