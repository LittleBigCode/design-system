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

/* Normalize the `data` / `segments` props into [{ label, segments }] rows. */
function toRows(data, segments) {
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
export const StackedBar = React.forwardRef(function StackedBar(
  { data, segments, showLegend = true, className, ...rest }, ref
) {
  const rows = toRows(data, segments);

  // Stable color per segment label across rows, falling back to position.
  const labelColor = new Map();
  let nextSlot = 0;
  const colorOf = (seg, i) => {
    if (seg.color) return seg.color;
    const key = seg.label != null ? String(seg.label) : `#${i}`;
    if (!labelColor.has(key)) {
      labelColor.set(key, SERIES_COLORS[nextSlot % SERIES_COLORS.length]);
      nextSlot += 1;
    }
    return labelColor.get(key);
  };

  const computed = rows.map((row) => {
    const total = row.segments.reduce((sum, s) => sum + (Number(s.value) || 0), 0);
    return {
      label: row.label,
      segments: row.segments.map((s, i) => {
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
        row.segments.map((s, si) => h("span", {
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
          legend.map((s, si) => h("span", { key: `le${si}`, className: "ds-chart-legend__item" },
            h("span", { className: "ds-chart-legend__swatch", style: { background: s.color } }),
            s.label
          ))
        )
      : null
  );
});
