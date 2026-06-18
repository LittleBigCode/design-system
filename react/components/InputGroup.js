import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- InputGroup ---------------------------------------------------------
   Glues addons to a control so they share borders (.ds-input-group). `before`
   and/or `after` render as .ds-input-group__addon; `children` is the control
   (an <Input>, native <input>/<select>, etc.). */
export function InputGroup({ before, after, className, children, ...rest }) {
  return h("div", { className: cx("ds-input-group", className), ...rest },
    before != null ? h("span", { className: "ds-input-group__addon" }, before) : null,
    children,
    after != null ? h("span", { className: "ds-input-group__addon" }, after) : null
  );
}
