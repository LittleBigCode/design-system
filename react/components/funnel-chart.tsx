"use client";

import * as React from "react";
import { Funnel, FunnelChart as RechartsFunnelChart, LabelList } from "recharts";

import { withSliceColors } from "../lib/chart-series.js";
import { cx } from "../lib/cx.js";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart.js";

/** How the percentage printed beside each stage is derived. */
export type FunnelConversion = "none" | "previous" | "first";

/**
 * The stage and share labels, drawn through `LabelList`'s `content` rather than
 * its built-in positions. Two reasons, both of which `position="right"` gets
 * wrong here:
 *
 *   - recharts clamps a label's text width to the **plot area**, which excludes
 *     the margin the label is actually drawn in, so every stage past the widest
 *     one wraps mid-name ("Added to" / "cart"). `width` cannot be overridden —
 *     `Label` sets `parentViewBox` after any prop spread.
 *   - anchoring to the trapezoid's own edge makes the column ragged, because the
 *     trapezoids narrow on the way down.
 *
 * Anchoring to the plot edge instead gives one straight column per side, and the
 * geometry still comes from recharts' `viewBox` rather than being guessed.
 */
function StageLabel({
  viewBox,
  parentViewBox,
  value,
  side,
  className,
}: {
  // Index signatures because recharts' `ViewBox` is a cartesian/polar union and
  // the polar arm shares no keys with these, which TS reads as a typo.
  viewBox?: { y?: number; height?: number; [key: string]: unknown };
  parentViewBox?: { x?: number; width?: number; [key: string]: unknown };
  value?: React.ReactNode;
  side: "left" | "right";
  className?: string;
}) {
  if (!viewBox || !parentViewBox || value == null || value === "") return null;

  const plotLeft = parentViewBox.x ?? 0;
  const plotRight = plotLeft + (parentViewBox.width ?? 0);

  return (
    <text
      x={side === "right" ? plotRight + 8 : plotLeft - 8}
      y={(viewBox.y ?? 0) + (viewBox.height ?? 0) / 2}
      textAnchor={side === "right" ? "start" : "end"}
      dominantBaseline="central"
      className={className}
    >
      {value}
    </text>
  );
}

/* FunnelChart — where people drop out of an ordered sequence.
   ---------------------------------------------------------------------------
   Visit to signup to activation to paid, lead to demo to proposal to close.
   Net-new in 1.0 — 0.11 had no funnel.

   The value of a funnel is the **drop**, not the absolute widths, and that is
   the whole reason this wrapper exists. The caller passes raw counts in stage
   order; `conversion` decides what percentage is derived from them:

     "previous"  ->  stage over stage, the drop at each step (default)
     "first"     ->  cumulative from the top of the funnel
     "none"      ->  counts only

   Colour rides on the row as recharts' own `fill`, the same per-slice path pie
   and donut take, so a `config` entry keyed by stage name still wins.

   Both labels are drawn in the margins rather than inside the trapezoids: the
   slice ramp runs the whole `--ds-chart-*` set, and no single text colour
   clears AA against all six. Outside, they sit on the page background.

   There is no `orientation` prop. recharts' `Funnel` computes its trapezoids
   from a fixed vertical stack — `layout` on the chart is not read — so a
   horizontal funnel would be a rotated SVG with sideways labels. Long stage
   names are handled by widening `margin.right` instead. */
function FunnelChart({
  className,
  config,
  data,
  nameKey,
  valueKey,
  conversion = "previous",
  legend = false,
  // The right margin is the label column, so it is wide by default: a stage name
  // plus its count runs to about 170px at this text size, and anything narrower
  // clips the longest stage rather than wrapping it. Widen it further for names
  // longer than roughly twenty characters.
  margin = { top: 8, right: 184, bottom: 8, left: 56 },
  children,
  ...props
}: Omit<React.ComponentProps<typeof ChartContainer>, "config" | "children"> & {
  /** Optional, keyed by stage name — names or colours a stage explicitly. */
  config?: ChartConfig;
  /** One row per stage, in order. The caller's order is the funnel's order. */
  data: Record<string, unknown>[];
  /** Row field holding the stage's name. */
  nameKey: string;
  /** Row field holding the stage's raw count. */
  valueKey: string;
  conversion?: FunnelConversion;
  /** Off by default — the stage names are already printed on the chart. */
  legend?: boolean;
  margin?: React.ComponentProps<typeof RechartsFunnelChart>["margin"];
  /** Extra recharts children — a second `Funnel`, a `Label`. */
  children?: React.ReactNode;
}) {
  const rows = React.useMemo(() => {
    const counts = data.map((row) => Number(row[valueKey]) || 0);
    const names = data.map((row) => String(row[nameKey]));

    return withSliceColors(data, nameKey).map((row, i) => {
      const base = conversion === "first" ? counts[0] : counts[i - 1];
      // Stage one has no previous stage, so stage-over-stage leaves it blank
      // rather than printing a meaningless 100%.
      const share =
        conversion === "none" || (conversion === "previous" && i === 0) || !base
          ? null
          : counts[i] / base;

      return {
        ...row,
        // Non-breaking spaces around the separator: SVG collapses ordinary
        // whitespace, and it does so unevenly at a text node's edges, so
        // "Sessions · 24 800" comes out as "Sessions·24 800" with plain ones.
        __stage: `${names[i]}\u00a0\u00b7\u00a0${counts[i].toLocaleString()}`,
        __share: share == null ? "" : `${Math.round(share * 100)}%`,
      };
    });
  }, [data, nameKey, valueKey, conversion]);

  return (
    <ChartContainer
      config={config ?? {}}
      className={cx("ds-chart-container--plot ds-funnel-chart-root", className)}
      {...props}
    >
      <RechartsFunnelChart margin={margin}>
        <ChartTooltip content={<ChartTooltipContent nameKey={nameKey} />} />
        {/* The source's comment here says recharts gates a funnel's labels
            behind `showLabels = !isAnimating`, and that its animation id is
            derived from a trapezoid array the selector rebuilds every render,
            so the animation restarts forever and the labels never arrive — then
            says "with the animation off they render", and never turns the
            animation off, on this component or any other. Absorbing that
            faithfully means shipping no `isAnimationActive` prop, and against
            the recharts this package pins the labels do render, animation on.
            tests/chart-marks.spec.ts asserts exactly that, in the one gate that
            opts back out of reduced motion — so if a recharts bump reintroduces
            the behaviour the comment describes, the gate says so rather than
            the labels quietly disappearing. */}
        <Funnel data={rows} dataKey={valueKey} nameKey={nameKey}>
          <LabelList
            dataKey="__stage"
            content={(labelProps) => (
              <StageLabel
                {...labelProps}
                side="right"
                className="ds-funnel-chart-stage-label"
              />
            )}
          />
          {conversion === "none" ? null : (
            <LabelList
              dataKey="__share"
              content={(labelProps) => (
                <StageLabel
                  {...labelProps}
                  side="left"
                  className="ds-funnel-chart-share-label"
                />
              )}
            />
          )}
        </Funnel>
        {legend ? (
          <ChartLegend content={<ChartLegendContent nameKey={nameKey} />} />
        ) : null}
        {children}
      </RechartsFunnelChart>
    </ChartContainer>
  );
}

export { FunnelChart };
