import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- StatCard ------------------------------------------------------------
   A dashboard KPI tile: an uppercase faint `label`, a large title-voiced
   `value`, an optional `delta` whose `deltaDir` ("up" | "down") colors it and
   prepends a ▲/▼, and `children` rendered in a spark slot under the value
   (e.g. a <Sparkline>). forwardRef lands on the root <div>. */
export const StatCard = React.forwardRef(function StatCard(
  { label, value, delta, deltaDir, className, children, ...rest }, ref
) {
  const dirClass = deltaDir === "up" ? "is-up" : deltaDir === "down" ? "is-down" : null;
  return h("div", {
    ref,
    className: cx("ds-stat", className),
    ...rest,
  },
    label != null ? h("div", { className: "ds-stat__label" }, label) : null,
    value != null ? h("div", { className: "ds-stat__value" }, value) : null,
    delta != null
      ? h("div", { className: cx("ds-stat__delta", dirClass) }, delta)
      : null,
    children != null ? h("div", { className: "ds-stat__spark" }, children) : null
  );
});
