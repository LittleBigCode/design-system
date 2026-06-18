import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Textarea -----------------------------------------------------------
   A flat, vertically-resizable <textarea> with the .ds-textarea look.
   Forwards a ref to the element; all props (value, rows, placeholder, ...)
   spread straight onto it. */
export const Textarea = React.forwardRef(function Textarea({ className, ...rest }, ref) {
  return h("textarea", { ref, className: cx("ds-textarea", className), ...rest });
});
