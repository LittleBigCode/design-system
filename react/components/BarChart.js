import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- BarChart ------------------------------------------------------------
   A simple flat bar chart, no library. `data` is { label, value, status? }[].
   Each bar length is value / max (max defaults to the largest value). The
   default orientation is vertical (a flex-end row of columns); `horizontal`
   lays the bars out as rows. A `status` recolors a bar (.is-<status>); bars
   default to the accent. forwardRef lands on the root <div>. */
export const BarChart = React.forwardRef(function BarChart(
  { data = [], max, horizontal = false, className, ...rest }, ref
) {
  const values = data.map((d) => d.value || 0);
  const top = max != null ? max : (values.length ? Math.max(...values) : 0);
  const pct = (v) => (top > 0 ? Math.max(0, Math.min(100, (v / top) * 100)) : 0);
  const dim = horizontal ? "width" : "height";

  return h("div", {
    ref,
    className: cx("ds-barchart", horizontal && "ds-barchart--horizontal", className),
    role: "img",
    ...rest,
  },
    data.map((d, i) => h("div", { key: d.label ?? i, className: "ds-barchart__col" },
      d.label != null
        ? h("span", { className: "ds-barchart__label" }, d.label)
        : null,
      h("div", { className: "ds-barchart__track" },
        h("div", {
          className: cx("ds-barchart__bar", d.status && `is-${d.status}`),
          style: { [dim]: `${pct(d.value || 0)}%` },
        })
      ),
      h("span", { className: "ds-barchart__value" }, d.value)
    ))
  );
});
