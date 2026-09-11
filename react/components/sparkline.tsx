"use client";

import * as React from "react";

import { cx } from "../lib/cx.js";

const r2 = (n: number) => Math.round(n * 100) / 100;

/* Sparkline — an inline mini line chart.
   ---------------------------------------------------------------------------
   Deliberately hand-rolled rather than built on `Chart`: a sparkline has to be
   cheap enough to sit in every row of a table, and one recharts
   ResponsiveContainer per cell is not. One polyline, no axes, no library —
   which is also what keeps it renderable as plain markup.

   The source's rewrite of 0.11's Sparkline fixes one defect: 0.11 divided by a
   `|| 1` span, which drew a flat series along the floor and read as a minimum
   it was not. A flat series — or a single point — now pins to the vertical
   middle. */
function Sparkline({
  className,
  data = [],
  width = 120,
  height = 32,
  stroke,
  fill,
  showDot = false,
  animate = false,
  style,
  "aria-label": ariaLabel,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  data?: number[];
  width?: number;
  height?: number;
  /** Line colour. Left off, the line is `currentColor` and inherits. */
  stroke?: string;
  /** Faint area under the line — `true` for currentColor, or its own colour. */
  fill?: boolean | string;
  /** Mark the last point. */
  showDot?: boolean;
  animate?: boolean;
}) {
  const pad = 2; // keeps the stroke and the end dot from clipping at the edges
  const n = data.length;
  const min = n ? Math.min(...data) : 0;
  const max = n ? Math.max(...data) : 0;
  const span = max - min;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;

  const points = data.map((v, i): [number, number] => [
    r2(n === 1 ? width / 2 : pad + (i / (n - 1)) * innerW),
    r2(span === 0 ? height / 2 : pad + (1 - (v - min) / span) * innerH),
  ]);

  const line = points.map((p) => p.join(",")).join(" ");
  const last = points[points.length - 1];
  const baseline = height - pad;
  const area = points.length
    ? `M${points[0][0]},${baseline} L${line} L${last[0]},${baseline} Z`
    : null;

  return (
    <span
      data-slot="sparkline"
      role="img"
      aria-label={ariaLabel ?? `Sparkline of ${n} value${n === 1 ? "" : "s"}`}
      className={cx("ds-sparkline", className)}
      style={stroke ? { color: stroke, ...style } : style}
      {...props}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        className="ds-sparkline-svg"
      >
        {fill && area ? (
          <path
            d={area}
            className="ds-sparkline-area"
            style={typeof fill === "string" ? { fill } : undefined}
          />
        ) : null}
        {points.length ? (
          <polyline
            points={line}
            pathLength={animate ? 1 : undefined}
            className={cx(
              "ds-sparkline-line",
              // pathLength=1 makes the dash maths resolution-free, so one
              // keyframe draws any width.
              animate && "ds-sparkline-line--animate",
            )}
          />
        ) : null}
        {showDot && last ? (
          <circle cx={last[0]} cy={last[1]} r={2} className="ds-sparkline-dot" />
        ) : null}
      </svg>
    </span>
  );
}

export { Sparkline };
