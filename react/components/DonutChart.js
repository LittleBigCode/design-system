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

/* ---- DonutChart ----------------------------------------------------------
   A pure-SVG donut, no library. Each `data` entry ({ label, value, color? })
   becomes a ring segment drawn with stroke-dasharray on a single <circle> —
   the arc length is value/total of the circumference, and a rotating
   dashoffset places each segment after the previous one. A faint full track
   sits behind. Optionally renders a big center number (`centerLabel`) and a
   `.ds-chart-legend` listing label + value. Renders role="img"; forwardRef
   lands on the root <div>. */
export const DonutChart = React.forwardRef(function DonutChart(
  { data = [], size = 180, thickness = 28, centerLabel,
    "aria-label": ariaLabel, className, ...rest }, ref
) {
  const items = Array.isArray(data) ? data : [];
  const total = items.reduce((sum, d) => sum + (Number(d.value) || 0), 0);

  // Stroke is centered on the circle path, so the radius is inset by half the
  // thickness to keep the ring inside the viewBox.
  const cxy = size / 2;
  const radius = (size - thickness) / 2;
  const circ = 2 * Math.PI * radius;

  // Walk the segments, accumulating the fraction already drawn.
  let acc = 0;
  const segments = items.map((d, i) => {
    const value = Number(d.value) || 0;
    const frac = total > 0 ? value / total : 0;
    const len = frac * circ;
    const seg = {
      key: i,
      color: d.color || SERIES_COLORS[i % SERIES_COLORS.length],
      dasharray: `${r2(len)} ${r2(circ - len)}`,
      // -90deg start (rotation on the element) puts the first arc at 12 o'clock;
      // each later arc is offset by the cumulative length already consumed.
      dashoffset: r2(-acc * circ),
      label: d.label,
      value,
    };
    acc += frac;
    return seg;
  });

  const label = ariaLabel != null
    ? ariaLabel
    : `Donut chart of ${items.length} segment${items.length === 1 ? "" : "s"}`;

  return h("div", {
    ref,
    className: cx("ds-chart", "ds-donut", className),
    role: "img",
    "aria-label": label,
    ...rest,
  },
    h("svg", {
      className: "ds-donut__svg",
      viewBox: `0 0 ${size} ${size}`,
      width: size, height: size,
      "aria-hidden": "true",
      focusable: "false",
    },
      // Rotate the whole ring -90deg so segments start at the top.
      h("g", { transform: `rotate(-90 ${cxy} ${cxy})` },
        h("circle", {
          className: "ds-donut__track",
          cx: cxy, cy: cxy, r: r2(radius), strokeWidth: thickness,
        }),
        segments.map((s) => h("circle", {
          key: s.key, className: "ds-donut__segment",
          cx: cxy, cy: cxy, r: r2(radius), strokeWidth: thickness,
          strokeDasharray: s.dasharray, strokeDashoffset: s.dashoffset,
          style: { stroke: s.color },
        }))
      ),
      centerLabel != null
        ? h("text", {
            className: "ds-donut__center",
            x: cxy, y: cxy,
            dominantBaseline: "central",
            fontSize: r2(size * 0.26),
          }, centerLabel)
        : null
    ),
    items.length
      ? h("div", { className: "ds-chart-legend" },
          segments.map((s) => h("span", { key: `le${s.key}`, className: "ds-chart-legend__item" },
            h("span", { className: "ds-chart-legend__swatch", style: { background: s.color } }),
            s.label,
            h("span", { className: "ds-chart-legend__value" }, s.value)
          ))
        )
      : null
  );
});
