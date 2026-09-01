import { cx } from "../lib/cx.js";
import React from "react";

import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface LineChartSeries {
  /** Series name, shown in the legend when there is more than one series. */
  name?: ReactNode;
  /** Y values to plot. */
  data: number[];
  /** Stroke/dot color. Defaults to a slot from the shared series palette. */
  color?: string;
}

export interface LineChartProps extends HTMLAttributes<HTMLDivElement> {
  /** Multi-series data. Takes precedence over `data` when non-empty. */
  series?: LineChartSeries[];
  /** Single-series shorthand for `series={[{ data }]}`. */
  data?: number[];
  /** SVG width in px. Defaults to 480. */
  width?: number;
  /** SVG height in px. Defaults to 200. */
  height?: number;
  /** X-axis tick labels, one per x position. */
  labels?: ReactNode[];
  /** Draw faint horizontal gridlines. Defaults to true. */
  grid?: boolean;
  /** Mark every data point with a dot. Defaults to true. */
  dots?: boolean;
}
const h = React.createElement;

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
function toSeries(series: any, data: any) {
  if (Array.isArray(series) && series.length) {
    return series.map((s, i) => ({
      name: s.name,
      data: Array.isArray(s.data) ? s.data : [],
      color: s.color || SERIES_COLORS[i % SERIES_COLORS.length],
    }));
  }
  return [{ name: undefined, data: Array.isArray(data) ? data : [], color: SERIES_COLORS[0] }];
}

const r2 = (n: any) => Math.round(n * 100) / 100;

/* ---- LineChart -----------------------------------------------------------
   A pure-SVG line chart, no library. Accepts either `data` (number[], single
   series) or `series` ([{ name, data, color? }], multi). All series share one
   y-range so they're comparable. Optional faint gridlines, x-axis `labels`,
   and dots (every point); a `.ds-chart-legend` is rendered when there is more
   than one named series. Renders role="img" with an aria-label; forwardRef
   lands on the root <div>. */
export const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(function LineChart(
  { series, data, width = 480, height = 200, labels, grid = true, dots = true,
    "aria-label": ariaLabel, className, ...rest }, ref
) {
  const all = toSeries(series, data);
  const multi = all.length > 1;

  // Inset the plot so strokes, dots and axis labels don't clip.
  const padX = 6;
  const padTop = 8;
  const padBottom = labels && labels.length ? 20 : 8;
  const innerW = Math.max(1, width - padX * 2);
  const innerH = Math.max(1, height - padTop - padBottom);
  const baseY = height - padBottom;

  // Shared y-range across every series (flat data pins to the middle).
  const flat = all.flatMap((s) => s.data);
  const min = flat.length ? Math.min(...flat) : 0;
  const max = flat.length ? Math.max(...flat) : 1;
  const span = max - min || 1;

  const n = Math.max(...all.map((s) => s.data.length), 0);
  const xAt = (i: any) => (n <= 1 ? padX + innerW / 2 : padX + (i / (n - 1)) * innerW);
  const yAt = (v: any) => padTop + (1 - (v - min) / span) * innerH;

  // 4 horizontal gridlines (top + 3 below).
  const gridLines = grid ? [0, 0.25, 0.5, 0.75, 1].map((t) => r2(padTop + t * innerH)) : [];

  const label = ariaLabel != null
    ? ariaLabel
    : `Line chart${multi ? ` with ${all.length} series` : ""}`;

  return h("div", {
    ref,
    className: cx("ds-chart", "ds-linechart", className),
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
      labels && labels.length
        ? labels.map((lab, i) => h("text", {
            key: `x${i}`, className: "ds-chart__axis",
            x: r2(xAt(i)), y: height - 6,
            textAnchor: i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle",
          }, lab))
        : null,
      all.map((s, si) => {
        const pts = s.data.map((v: any, i: any) => `${r2(xAt(i))},${r2(yAt(v))}`).join(" ");
        if (!pts) return null;
        return h("polyline", {
          key: `l${si}`, className: "ds-linechart__line",
          points: pts, style: { stroke: s.color },
        });
      }),
      dots
        ? all.flatMap((s, si) => s.data.map((v: any, i: any) => h("circle", {
            key: `d${si}-${i}`, className: "ds-linechart__dot",
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
