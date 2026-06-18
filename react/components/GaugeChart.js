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

/* Point on the gauge circle at `angle` radians, measured clockwise from the
   6 o'clock position (so the 270° gauge opens at the bottom). */
function pointAt(cxy, radius, angle) {
  return [
    r2(cxy - radius * Math.sin(angle)),
    r2(cxy + radius * Math.cos(angle)),
  ];
}

/* SVG arc path from the gauge start, sweeping `angle` radians clockwise. */
function arcPath(cxy, radius, startAngle, angle) {
  const [x1, y1] = pointAt(cxy, radius, startAngle);
  const [x2, y2] = pointAt(cxy, radius, startAngle + angle);
  const largeArc = angle > Math.PI ? 1 : 0;
  return `M ${x1},${y1} A ${r2(radius)} ${r2(radius)} 0 ${largeArc} 1 ${x2},${y2}`;
}

/* Pick a color from a value→color thresholds array (last threshold whose
   `at` the value reaches wins); falls back to `fallback`. */
function colorFor(value, thresholds, fallback) {
  if (!Array.isArray(thresholds)) return fallback;
  let chosen = fallback;
  for (const t of thresholds) {
    if (value >= (Number(t.at) || 0) && t.color) chosen = t.color;
  }
  return chosen;
}

/* ---- GaugeChart ----------------------------------------------------------
   A pure-SVG radial gauge for a single value, no library. A faint 270° track
   arc sits behind a colored value arc whose length is value/max of the track
   (drawn with stroke-dasharray on the same arc path). A big center number
   (var(--ds-font-title)) shows the value, with an optional uppercase label
   beneath. The arc color defaults to var(--ds-chart-1); pass `color` to
   override, or a `thresholds` array ([{ at, color }]) to map value→color.
   Renders role="img"; forwardRef lands on the root <div>. */
export const GaugeChart = React.forwardRef(function GaugeChart(
  { value = 0, max = 100, size = 180, label, thickness = 16, color,
    thresholds, format, "aria-label": ariaLabel, className, ...rest }, ref
) {
  const v = Number(value) || 0;
  const top = Number(max) || 100;
  const frac = top > 0 ? Math.max(0, Math.min(1, v / top)) : 0;

  // 270° gauge: a gap at the bottom. The arc starts 45° before 6 o'clock and
  // sweeps clockwise through 270°.
  const sweep = (270 * Math.PI) / 180;
  const startAngle = (45 * Math.PI) / 180;

  const cxy = size / 2;
  const radius = (size - thickness) / 2;
  const track = arcPath(cxy, radius, startAngle, sweep);
  const arcLen = sweep * radius;
  const valueLen = frac * arcLen;

  const arcColor = color || colorFor(v, thresholds, SERIES_COLORS[0]);
  const centerText = typeof format === "function" ? format(v) : `${r2(v)}`;

  const ariaText = ariaLabel != null
    ? ariaLabel
    : `${label ? `${label}: ` : ""}${r2(v)} of ${top}`;

  return h("div", {
    ref,
    className: cx("ds-chart", "ds-gauge", className),
    role: "img",
    "aria-label": ariaText,
    ...rest,
  },
    h("svg", {
      className: "ds-gauge__svg",
      viewBox: `0 0 ${size} ${size}`,
      width: size, height: size,
      "aria-hidden": "true",
      focusable: "false",
    },
      h("path", {
        className: "ds-gauge__track",
        d: track, strokeWidth: thickness,
      }),
      h("path", {
        className: "ds-gauge__value",
        d: track, strokeWidth: thickness,
        strokeDasharray: `${r2(valueLen)} ${r2(arcLen)}`,
        style: { stroke: arcColor },
      },
        h("title", null, ariaText)
      ),
      h("text", {
        className: "ds-gauge__center",
        x: cxy, y: label != null ? cxy - r2(size * 0.02) : cxy,
        dominantBaseline: "central",
        fontSize: r2(size * 0.24),
      }, centerText),
      label != null
        ? h("text", {
            className: "ds-gauge__label",
            x: cxy, y: cxy + r2(size * 0.18),
            dominantBaseline: "central",
          }, label)
        : null
    )
  );
});
