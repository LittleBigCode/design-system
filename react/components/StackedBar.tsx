import { cx } from "../lib/cx.js";
import React from "react";

import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface StackedBarSegment {
  /** Segment label, shown in the legend and the hover title. */
  label?: ReactNode;
  /** Segment value; width is value / row-total. */
  value: number;
  /** Segment color. Defaults to a slot from the shared series palette. */
  color?: string;
}

export interface StackedBarRow {
  /** Row label, shown to the left of the track. */
  label?: ReactNode;
  /** Segments stacked across the row. */
  segments: StackedBarSegment[];
}

export interface StackedBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Rows of stacked segments. Provide this OR `segments`. */
  data?: StackedBarRow[];
  /** A single row's segments (shorthand for one-row `data`). */
  segments?: StackedBarSegment[];
  /** Render the segment-label legend below the bars. Defaults to true. */
  showLegend?: boolean;
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

const r2 = (n: any) => Math.round(n * 100) / 100;

/* Normalize the `data` / `segments` props into [{ label, segments }] rows. */
function toRows(data: any, segments: any) {
  if (Array.isArray(data) && data.length) {
    return data.map((row) => ({
      label: row.label,
      segments: Array.isArray(row.segments) ? row.segments : [],
    }));
  }
  if (Array.isArray(segments) && segments.length) {
    return [{ label: undefined, segments }];
  }
  return [];
}

/* ---- StackedBar ----------------------------------------------------------
   Flat horizontal stacked bars, no library. Accepts either `data`
   ([{ label, segments:[{ label, value, color? }] }], one row each) or a single
   `segments` array. Each row is a 100%-wide flex track whose segments take a
   proportional width (value/row-total), colored from segment.color || the
   shared series palette and set inline as a percentage. Every segment carries
   a <title> ("label: value") for a native hover tooltip. A shared legend lists
   the segment labels (taken from the first row). forwardRef lands on the root
   <div>. */
export const StackedBar = React.forwardRef<HTMLDivElement, StackedBarProps>(function StackedBar(
  { data, segments, showLegend = true, className, ...rest }, ref
) {
  const rows = toRows(data, segments);

  // Stable color per segment label across rows, falling back to position.
  const labelColor = new Map();
  let nextSlot = 0;
  const colorOf = (seg: any, i: any) => {
    if (seg.color) return seg.color;
    const key = seg.label != null ? String(seg.label) : `#${i}`;
    if (!labelColor.has(key)) {
      labelColor.set(key, SERIES_COLORS[nextSlot % SERIES_COLORS.length]);
      nextSlot += 1;
    }
    return labelColor.get(key);
  };

  const computed = rows.map((row) => {
    const total = row.segments.reduce((sum: any, s: any) => sum + (Number(s.value) || 0), 0);
    return {
      label: row.label,
      segments: row.segments.map((s: any, i: any) => {
        const value = Number(s.value) || 0;
        return {
          label: s.label,
          value,
          color: colorOf(s, i),
          pct: total > 0 ? r2((value / total) * 100) : 0,
        };
      }),
    };
  });

  // Legend reflects the segment labels of the first row.
  const legend = computed.length ? computed[0].segments : [];

  return h("div", {
    ref,
    className: cx("ds-chart", "ds-stackedbar", className),
    role: "img",
    ...rest,
  },
    computed.map((row, ri) => h("div", { key: row.label ?? ri, className: "ds-stackedbar__row" },
      row.label != null
        ? h("span", { className: "ds-stackedbar__label" }, row.label)
        : null,
      h("div", { className: "ds-stackedbar__track" },
        row.segments.map((s: any, si: any) => h("span", {
          key: si,
          className: "ds-stackedbar__seg",
          style: { width: `${s.pct}%`, background: s.color },
          // HTML element → native tooltip is the `title` attribute, not a child.
          title: s.label != null ? `${s.label}: ${s.value}` : `${s.value}`,
        }))
      )
    )),
    showLegend && legend.length
      ? h("div", { className: "ds-chart-legend" },
          legend.map((s: any, si: any) => h("span", { key: `le${si}`, className: "ds-chart-legend__item" },
            h("span", { className: "ds-chart-legend__swatch", style: { background: s.color } }),
            s.label
          ))
        )
      : null
  );
});
