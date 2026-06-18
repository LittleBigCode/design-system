import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- FieldHint ----------------------------------------------------------
   Helper / validation text under a field (.ds-field__hint). `status` of
   "error" or "success" adds the matching color modifier. */
export function FieldHint({ status, className, children, ...rest }) {
  return h("span", {
    className: cx("ds-field__hint", status && `ds-field__hint--${status}`, className),
    ...rest,
  }, children);
}
