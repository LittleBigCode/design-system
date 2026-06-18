import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Spinner -------------------------------------------------------------
   A circular loading indicator. `size` is "sm" | "lg" (default medium).
   Exposes role="status" + an accessible label (default "Loading"). */
export const Spinner = React.forwardRef(function Spinner(
  { size, inline = false, label = "Loading", className, ...rest }, ref
) {
  return h("span", {
    ref,
    role: "status",
    "aria-label": label,
    className: cx(
      "ds-spinner",
      size && `ds-spinner--${size}`,
      inline && "ds-spinner--inline",
      className
    ),
    ...rest,
  });
});
