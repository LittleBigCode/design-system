import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* A small shared series palette of --ds-* tokens. */
const SERIES_COLORS = [
  "var(--ds-chart-1)",
  "var(--ds-chart-2)",
  "var(--ds-chart-3)",
  "var(--ds-chart-4)",
  "var(--ds-chart-5)",
  "var(--ds-chart-6)",
];

const r2 = (n) => Math.round(n * 100) / 100;

/* Point on the circle at `angle` radians (0 = 12 o'clock, clockwise). */
function pointAt(cxy, radius, angle) {
  return [
    r2(cxy + radius * Math.sin(angle)),
    r2(cxy - radius * Math.cos(angle)),
  ];
}

/* ---- PieChart ------------------------------------------------------------
   A pure-SVG full pie (no hole), no library. Each `data` entry
   ({ label, value, color? }) becomes a wedge drawn as an SVG <path> arc — the
   sweep angle is value/total of 360°, walked clockwise from 12 o'clock. Each
   slice carries a <title> ("label: value") for a native hover tooltip and its
   color from data.color || the shared series palette. Optionally renders a
   `.ds-chart-legend` listing label + value. Renders role="img"; forwardRef
   lands on the root <div>. */
export const PieChart = React.forwardRef(function PieChart(
  { data = [], size = 180, legend = true,
    "aria-label": ariaLabel, className, ...rest }, ref
) {
  const items = Array.isArray(data) ? data : [];
  const total = items.reduce((sum, d) => sum + (Number(d.value) || 0), 0);

  const cxy = size / 2;
  const radius = size / 2;

  // Walk the wedges clockwise from the top, accumulating the angle consumed.
  let acc = 0;
  const slices = items.map((d, i) => {
    const value = Number(d.value) || 0;
    const frac = total > 0 ? value / total : 0;
    const start = acc * 2 * Math.PI;
    const end = (acc + frac) * 2 * Math.PI;
    acc += frac;

    const color = d.color || SERIES_COLORS[i % SERIES_COLORS.length];
    let path;
    if (frac >= 1) {
      // A single full-circle slice can't be drawn as one arc — use two halves.
      const [mx, my] = pointAt(cxy, radius, Math.PI);
      path = `M ${cxy},${r2(cxy - radius)} A ${r2(radius)} ${r2(radius)} 0 1 1 ${mx},${my} `
        + `A ${r2(radius)} ${r2(radius)} 0 1 1 ${cxy},${r2(cxy - radius)} Z`;
    } else {
      const [x1, y1] = pointAt(cxy, radius, start);
      const [x2, y2] = pointAt(cxy, radius, end);
      const largeArc = end - start > Math.PI ? 1 : 0;
      path = `M ${cxy},${cxy} L ${x1},${y1} `
        + `A ${r2(radius)} ${r2(radius)} 0 ${largeArc} 1 ${x2},${y2} Z`;
    }

    return { key: i, color, path, label: d.label, value };
  });

  const label = ariaLabel != null
    ? ariaLabel
    : `Pie chart of ${items.length} segment${items.length === 1 ? "" : "s"}`;

  return h("div", {
    ref,
    className: cx("ds-chart", "ds-piechart", className),
    role: "img",
    "aria-label": label,
    ...rest,
  },
    h("svg", {
      className: "ds-piechart__svg",
      viewBox: `0 0 ${size} ${size}`,
      width: size, height: size,
      "aria-hidden": "true",
      focusable: "false",
    },
      slices.map((s) => h("path", {
        key: s.key, className: "ds-piechart__slice",
        d: s.path, style: { fill: s.color },
      },
        h("title", null, s.label != null ? `${s.label}: ${s.value}` : `${s.value}`)
      ))
    ),
    legend && items.length
      ? h("div", { className: "ds-chart-legend" },
          slices.map((s) => h("span", { key: `le${s.key}`, className: "ds-chart-legend__item" },
            h("span", { className: "ds-chart-legend__swatch", style: { background: s.color } }),
            s.label,
            h("span", { className: "ds-chart-legend__value" }, s.value)
          ))
        )
      : null
  );
});
