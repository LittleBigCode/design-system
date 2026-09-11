"use client";

import * as React from "react";

import { cx } from "../lib/cx.js";

export interface GaugeThreshold {
  /** Value at or above which `color` applies (last matching wins). */
  at: number;
  /** Arc color once this threshold is reached. */
  color: string;
}

/* Gauge — a 270° radial gauge for one value.
   ---------------------------------------------------------------------------
   Replaces 0.11's `GaugeChart` under the source's shorter name: a faint full
   track arc behind a coloured value arc, sized by stroke-dasharray so the arc
   redraws without recomputing any SVG arc path as the value changes. Every prop
   0.11 took survives — `value`, `max`, `size`, `thickness`, `label`, `color`,
   `thresholds`, `format` — so this is a rename plus a re-class, not an API
   change.

   Library-free on purpose, like `Sparkline`: a gauge is one value and two arcs,
   and it renders identically as hand-written markup, which is what keeps it
   available to the CSS-only bindings. */
function Gauge({
  className,
  value,
  max = 100,
  size = 180,
  thickness = 16,
  label,
  color,
  thresholds,
  format,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  value: number;
  max?: number;
  size?: number;
  thickness?: number;
  label?: React.ReactNode;
  /** Arc color override. Defaults to `var(--ds-chart-1)`. */
  color?: string;
  thresholds?: GaugeThreshold[];
  format?: (value: number) => React.ReactNode;
}) {
  const frac = max > 0 ? Math.max(0, Math.min(1, value / max)) : 0;
  const sweep = (270 * Math.PI) / 180;
  const startAngle = (45 * Math.PI) / 180;
  const cxy = size / 2;
  const radius = (size - thickness) / 2;
  const arcLen = sweep * radius;
  const valueLen = frac * arcLen;

  const point = (angle: number): [number, number] => [
    cxy - radius * Math.sin(angle),
    cxy + radius * Math.cos(angle),
  ];
  const [x1, y1] = point(startAngle);
  const [x2, y2] = point(startAngle + sweep);
  const track = `M ${x1},${y1} A ${radius},${radius} 0 1 1 ${x2},${y2}`;

  const arcColor =
    color ??
    thresholds?.reduce<string | undefined>(
      (chosen, t) => (value >= t.at ? t.color : chosen),
      undefined,
    ) ??
    "var(--ds-chart-1)";

  const centerText = format ? format(value) : Math.round(value);
  const ariaLabel = `${label ? `${label}: ` : ""}${Math.round(value)} of ${max}`;

  return (
    <div
      data-slot="gauge"
      role="img"
      aria-label={ariaLabel}
      className={cx("ds-gauge", className)}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
        className="ds-gauge-svg"
      >
        <path
          d={track}
          fill="none"
          strokeWidth={thickness}
          className="ds-gauge-track"
        />
        <path
          d={track}
          fill="none"
          strokeWidth={thickness}
          strokeDasharray={`${valueLen} ${arcLen}`}
          className="ds-gauge-value"
          style={{ stroke: arcColor }}
        />
        <text
          x={cxy}
          y={label != null ? cxy - size * 0.02 : cxy}
          dominantBaseline="central"
          textAnchor="middle"
          fontSize={size * 0.24}
          className="ds-gauge-center"
        >
          {centerText}
        </text>
        {label != null && (
          <text
            x={cxy}
            y={cxy + size * 0.18}
            dominantBaseline="central"
            textAnchor="middle"
            className="ds-gauge-label"
          >
            {label}
          </text>
        )}
      </svg>
    </div>
  );
}

export { Gauge };
