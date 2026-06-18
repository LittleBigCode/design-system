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

/* Normalize the `data` / `series` props into [{ name, data, color }]. */
function toSeries(series, data) {
  if (Array.isArray(series) && series.length) {
    return series.map((s, i) => ({
      name: s.name,
      data: Array.isArray(s.data) ? s.data : [],
      color: s.color || SERIES_COLORS[i % SERIES_COLORS.length],
    }));
  }
  return [{ name: undefined, data: Array.isArray(data) ? data : [], color: SERIES_COLORS[0] }];
}

const r2 = (n) => Math.round(n * 100) / 100;

/* ---- AreaChart -----------------------------------------------------------
   A pure-SVG area chart, no library. Like LineChart, but each series also
   draws a semi-transparent band from its line down to the baseline (fill is
   the series color at low fill-opacity). Accepts either `data` (number[]) or
   `series` ([{ name, data, color? }]); all series share one y-range. Optional
   gridlines, x `labels`, dots, and a `.ds-chart-legend` for multi series.
   Renders role="img"; forwardRef lands on the root <div>. */
export const AreaChart = React.forwardRef(function AreaChart(
  { series, data, width = 480, height = 200, labels, grid = true, dots = true,
    "aria-label": ariaLabel, className, ...rest }, ref
) {
  const all = toSeries(series, data);
  const multi = all.length > 1;

  const padX = 6;
  const padTop = 8;
  const padBottom = labels && labels.length ? 20 : 8;
  const innerW = Math.max(1, width - padX * 2);
  const innerH = Math.max(1, height - padTop - padBottom);
  const baseY = height - padBottom;

  const flat = all.flatMap((s) => s.data);
  const min = flat.length ? Math.min(...flat) : 0;
  const max = flat.length ? Math.max(...flat) : 1;
  const span = max - min || 1;

  const n = Math.max(...all.map((s) => s.data.length), 0);
  const xAt = (i) => (n <= 1 ? padX + innerW / 2 : padX + (i / (n - 1)) * innerW);
  const yAt = (v) => padTop + (1 - (v - min) / span) * innerH;

  const gridLines = grid ? [0, 0.25, 0.5, 0.75, 1].map((t) => r2(padTop + t * innerH)) : [];

  const label = ariaLabel != null
    ? ariaLabel
    : `Area chart${multi ? ` with ${all.length} series` : ""}`;

  return h("div", {
    ref,
    className: cx("ds-chart", "ds-areachart", className),
    role: "img",
    "aria-label": label,
    ...rest,
  },
    h("svg", {
      className: "ds-chart__svg",
      viewBox: `0 0 ${width} ${height}`,
      width, height,
      preserveAspectRatio: "none",
      "aria-hidden": "true",
      focusable: "false",
    },
      gridLines.map((y, i) => h("line", {
        key: `g${i}`, className: "ds-chart__grid",
        x1: padX, y1: y, x2: width - padX, y2: y,
      })),
      // Areas first so the lines + dots paint on top.
      all.map((s, si) => {
        if (!s.data.length) return null;
        const line = s.data.map((v, i) => `${r2(xAt(i))},${r2(yAt(v))}`).join(" ");
        const x0 = r2(xAt(0));
        const xN = r2(xAt(s.data.length - 1));
        const areaD = `M${x0},${r2(baseY)} L${line} L${xN},${r2(baseY)} Z`;
        return h("path", {
          key: `a${si}`, className: "ds-areachart__area",
          d: areaD, style: { fill: s.color },
        });
      }),
      all.map((s, si) => {
        const pts = s.data.map((v, i) => `${r2(xAt(i))},${r2(yAt(v))}`).join(" ");
        if (!pts) return null;
        return h("polyline", {
          key: `l${si}`, className: "ds-areachart__line",
          points: pts, style: { stroke: s.color },
        });
      }),
      labels && labels.length
        ? labels.map((lab, i) => h("text", {
            key: `x${i}`, className: "ds-chart__axis",
            x: r2(xAt(i)), y: height - 6,
            textAnchor: i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle",
          }, lab))
        : null,
      dots
        ? all.flatMap((s, si) => s.data.map((v, i) => h("circle", {
            key: `d${si}-${i}`, className: "ds-areachart__dot",
            cx: r2(xAt(i)), cy: r2(yAt(v)), r: 2.5,
            style: { fill: s.color },
          })))
        : null
    ),
    multi
      ? h("div", { className: "ds-chart-legend" },
          all.map((s, si) => h("span", { key: `le${si}`, className: "ds-chart-legend__item" },
            h("span", { className: "ds-chart-legend__swatch", style: { background: s.color } }),
            s.name ?? `Series ${si + 1}`
          ))
        )
      : null
  );
});
