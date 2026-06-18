import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Sparkline -----------------------------------------------------------
   An inline SVG mini line chart. `data` (number[]) is scaled to fit the
   width/height box and drawn as a single polyline. Pass `fill` to add a faint
   area under the line, and `showDot` to mark the last point. The line uses
   currentColor; `stroke`/`fill` override the SVG colors directly. No axes, no
   library. Renders role="img" with an aria-label. forwardRef lands on the
   root <span>. */
export const Sparkline = React.forwardRef(function Sparkline(
  { data = [], width = 120, height = 32, stroke, fill, showDot = false,
    "aria-label": ariaLabel, className, style, ...rest }, ref
) {
  const pad = 2; // keep the stroke + end dot from clipping at the edges
  const n = data.length;

  // Scale the points into the [pad, size-pad] box. A flat series (or a single
  // point) is pinned to the vertical middle.
  let points = [];
  if (n > 0) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const span = max - min || 1;
    const innerW = width - pad * 2;
    const innerH = height - pad * 2;
    points = data.map((v, i) => {
      const x = n === 1 ? width / 2 : pad + (i / (n - 1)) * innerW;
      const y = pad + (1 - (v - min) / span) * innerH;
      return [Math.round(x * 100) / 100, Math.round(y * 100) / 100];
    });
  }

  const line = points.map((p) => p.join(",")).join(" ");
  const areaPath = points.length
    ? `M${points[0][0]},${height - pad} L` +
      points.map((p) => p.join(",")).join(" ") +
      ` L${points[points.length - 1][0]},${height - pad} Z`
    : null;
  const last = points[points.length - 1];

  const label = ariaLabel != null
    ? ariaLabel
    : `Sparkline of ${n} value${n === 1 ? "" : "s"}`;

  return h("span", {
    ref,
    className: cx("ds-sparkline", className),
    style: stroke ? { color: stroke, ...style } : style,
    role: "img",
    "aria-label": label,
    ...rest,
  },
    h("svg", {
      className: "ds-sparkline__svg",
      width, height,
      viewBox: `0 0 ${width} ${height}`,
      preserveAspectRatio: "none",
      "aria-hidden": "true",
      focusable: "false",
    },
      fill && areaPath
        ? h("path", {
            className: "ds-sparkline__area",
            d: areaPath,
            style: typeof fill === "string" ? { fill } : undefined,
          })
        : null,
      points.length
        ? h("polyline", { className: "ds-sparkline__line", points: line })
        : null,
      showDot && last
        ? h("circle", { className: "ds-sparkline__dot", cx: last[0], cy: last[1], r: 2 })
        : null
    )
  );
});
