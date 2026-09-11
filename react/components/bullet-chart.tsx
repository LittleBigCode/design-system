"use client";

import * as React from "react";

import { cx } from "../lib/cx.js";

/** A qualitative range behind the measure. `to` is its upper bound. */
export type BulletBand = {
  to: number;
  tone?: "neutral" | "success" | "warning" | "danger";
};

/**
 * Band fills are surface tints, never a tone ink at reduced opacity: fading an
 * ink is what re-opens the AA failure the tone tokens exist to close, and a band
 * sits *under* the measure bar, so it has to behave like a surface. The `-bg`
 * tints are the tier-2 tokens the dark theme already re-tunes, so a band tracks
 * the theme without this component knowing which one is active.
 */
const BAND_FILL = {
  success: "var(--ds-success-bg)",
  warning: "var(--ds-warning-bg)",
  danger: "var(--ds-danger-bg)",
} as const;

/**
 * The default ramp, darkest first, so an unbanded chart still reads as poor to
 * good left to right. These three are semantic and theme-aware, which the
 * tier-1 grey ramp is not — `--ds-grey-light` stays #f5f5f5 on a dark page and
 * would swallow the measure bar.
 */
const NEUTRAL_RAMP = [
  "var(--ds-rule)",
  "var(--ds-rule-soft)",
  "var(--ds-bg-alt)",
];

function bandFill(band: BulletBand, index: number) {
  if (band.tone && band.tone !== "neutral") return BAND_FILL[band.tone];
  return NEUTRAL_RAMP[Math.min(index, NEUTRAL_RAMP.length - 1)];
}

/* BulletChart — how an actual value sits against a target and its qualitative
   bands.
   ---------------------------------------------------------------------------
   68% of quota, target 80%, bands poor/ok/good. Net-new in 1.0.

   `Meter`, `Gauge` and `Progress` all answer "where does this value sit in a
   range"; none of them can express a target marker or comparison bands, and
   that gap is the whole reason this exists. Stephen Few's bullet graph: one
   measure bar, one target tick across it, two or three background bands.

   Library-free — plain divs and percentages, no SVG and no chart library, so
   the markup is reproducible by a non-React binding, the way `.ds-sparkline`
   and `.ds-heatmap` are.

   Sized to sit inside a `StatCard` or a table cell, and the primary use is a
   stack of them. That is why the label and figure columns are fixed widths
   driven by `--ds-bullet-label` and `--ds-bullet-value` rather than sized to
   their content: intrinsic columns would leave every row in a stack starting at
   a different x. Retune them on a wrapper, or on one chart through `style`.

   There is no `orientation`. A vertical bullet would need the label above
   rather than beside it, which is a different layout rather than a swapped
   axis, and the stacked-in-a-card case this is built for is horizontal. */
function BulletChart({
  className,
  value,
  target,
  max,
  min = 0,
  bands,
  label,
  caption,
  formatValue = (figure) => figure.toLocaleString(),
  "aria-label": ariaLabel,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  value: number;
  /** The perpendicular tick. Omitted, this degrades to a banded meter. */
  target?: number;
  max: number;
  min?: number;
  /** Ascending by `to`. Left off, a neutral three-band ramp is drawn. */
  bands?: BulletBand[];
  label?: React.ReactNode;
  caption?: React.ReactNode;
  /** Used for the printed figure and for the accessible value text. */
  formatValue?: (figure: number) => string;
}) {
  const span = max - min || 1;
  const pct = (figure: number) =>
    `${Math.min(100, Math.max(0, ((figure - min) / span) * 100))}%`;

  const ranges = (
    bands ?? [{ to: min + span / 3 }, { to: min + (span * 2) / 3 }, { to: max }]
  )
    .slice()
    .sort((a, b) => a.to - b.to);

  // The target is the point of the chart and is invisible to a screen reader
  // otherwise, so it goes in the spoken value rather than only in the geometry.
  // A semicolon, not a comma: a comma is also the decimal separator in most of
  // the locales this ships to, so "99,96, target 99,9" is read as one run of
  // digits. This is the string a screen reader speaks instead of a bare number.
  const valueText =
    target === undefined
      ? formatValue(value)
      : `${formatValue(value)}; target ${formatValue(target)}`;

  return (
    <div
      data-slot="bullet-chart"
      className={cx("ds-bullet-chart", className)}
      {...props}
    >
      <div className="ds-bullet-chart-info">
        {label != null ? (
          <div className="ds-bullet-chart-label">{label}</div>
        ) : null}
        {caption != null ? (
          <div className="ds-bullet-chart-caption">{caption}</div>
        ) : null}
      </div>
      {/* The role and the name go on the same element: a name on the outer grid
          would leave the meter itself unlabelled. */}
      <div
        role="meter"
        aria-label={
          ariaLabel ?? (typeof label === "string" ? label : undefined)
        }
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={valueText}
        className="ds-bullet-chart-track"
      >
        {ranges.map((band, i) => {
          const from = i === 0 ? min : ranges[i - 1].to;
          return (
            <div
              key={band.to}
              aria-hidden
              className="ds-bullet-chart-band"
              style={{
                left: pct(from),
                width: `calc(${pct(band.to)} - ${pct(from)})`,
                backgroundColor: bandFill(band, i),
              }}
            />
          );
        })}
        <div
          aria-hidden
          className="ds-bullet-chart-measure"
          style={{ width: pct(value) }}
        />
        {target === undefined ? null : (
          <div
            aria-hidden
            className="ds-bullet-chart-target"
            style={{ left: pct(target) }}
          />
        )}
      </div>
      <div className="ds-bullet-chart-value">{formatValue(value)}</div>
    </div>
  );
}

export { BulletChart };
