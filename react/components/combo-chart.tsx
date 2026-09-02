"use client";

import * as React from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

import { seriesColor } from "../lib/chart-series.js";
import { cx } from "../lib/cx.js";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart.js";

/** One series and the mark and scale it is drawn against. */
export type ComboSeries = {
  /** Row field, and the key into `config` that names and colours it. */
  key: string;
  type: "bar" | "line" | "area";
  /** Which scale the series is measured on. Defaults to the left. */
  axis?: "left" | "right";
};

/**
 * Marks are drawn back to front, not in the order they are declared: an area is
 * a filled region and belongs behind the bars, a line is a reading and belongs
 * on top of them. Sorting here rather than trusting declaration order is the
 * difference between a visible line and one hidden under a bar.
 */
const LAYER = { area: 0, bar: 1, line: 2 } as const;

/* ComboChart — a volume series and a rate series on one x axis.
   ---------------------------------------------------------------------------
   Revenue bars with a margin line, signups with a conversion rate, tickets
   opened with median resolution time. Net-new in 1.0: `BarChart` and
   `LineChart` cannot share an axis, so this shape was previously unreachable.

   It keeps `LineChart`'s `config` + `data` + `xAxisKey`, and adds the one thing
   that makes the form work:

     `series`     ->  which mark each config key is drawn as, and which of the
                       two scales it is measured on
     `rightAxis`  ->  the second scale. Omitted, no second axis renders and the
                       chart degrades to a single-scale composed chart

   The axis ids are spelled out as `"left"` and `"right"` rather than left to
   recharts' defaults, because a half-specified `yAxisId` silently puts every
   series back on one scale — a chart that draws, reads plausibly, and is
   wrong. */
function ComboChart({
  className,
  config,
  data,
  xAxisKey,
  series,
  rightAxis,
  grid = true,
  legend,
  margin = { top: 8, right: 12, bottom: 0, left: 12 },
  children,
  ...props
}: Omit<React.ComponentProps<typeof ChartContainer>, "config" | "children"> & {
  config: ChartConfig;
  data: Record<string, unknown>[];
  /** Row field the x axis reads its categories from. */
  xAxisKey?: string;
  series: ComboSeries[];
  /** The second scale. Left off, every series shares the left one. */
  rightAxis?: {
    label?: string;
    tickFormatter?: (value: number) => string;
    domain?: [number, number];
  };
  grid?: boolean;
  /** Defaults on once `series` names more than one entry. */
  legend?: boolean;
  margin?: React.ComponentProps<typeof ComposedChart>["margin"];
  /** Extra recharts children — a `ReferenceLine`, a `Brush`. */
  children?: React.ReactNode;
}) {
  const marks = [...series].sort((a, b) => LAYER[a.type] - LAYER[b.type]);
  // A series asking for a scale that was never declared would bind to a missing
  // axis and drop out of the chart entirely, so it falls back to the left one.
  const axisOf = (mark: ComboSeries) =>
    rightAxis && mark.axis === "right" ? "right" : "left";

  return (
    <ChartContainer
      config={config}
      className={cx("ds-chart-container--plot", className)}
      {...props}
    >
      <ComposedChart accessibilityLayer data={data} margin={margin}>
        {grid ? <CartesianGrid vertical={false} /> : null}
        {xAxisKey ? (
          <XAxis
            dataKey={xAxisKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval="preserveStartEnd"
            minTickGap={16}
          />
        ) : null}
        <YAxis yAxisId="left" tickLine={false} axisLine={false} width={44} />
        {rightAxis ? (
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={rightAxis.domain}
            tickFormatter={rightAxis.tickFormatter}
            tickLine={false}
            axisLine={false}
            width={44}
            label={
              rightAxis.label
                ? {
                    value: rightAxis.label,
                    angle: -90,
                    position: "insideRight",
                    fontSize: 11,
                  }
                : undefined
            }
          />
        ) : null}
        <ChartTooltip content={<ChartTooltipContent />} />
        {(legend ?? series.length > 1) ? (
          <ChartLegend content={<ChartLegendContent />} />
        ) : null}
        {marks.map((mark) => {
          // The ramp slot follows the caller's declaration order, not the draw
          // order, so a legend read top to bottom matches the colours.
          const colour = seriesColor(
            mark.key,
            series.findIndex((entry) => entry.key === mark.key),
          );
          const shared = {
            dataKey: mark.key,
            yAxisId: axisOf(mark),
          };

          if (mark.type === "bar") {
            return <Bar key={mark.key} {...shared} fill={colour} />;
          }
          if (mark.type === "area") {
            return (
              <Area
                key={mark.key}
                {...shared}
                stroke={colour}
                fill={colour}
                fillOpacity={0.2}
                strokeWidth={2}
                dot={false}
              />
            );
          }
          return (
            <Line
              key={mark.key}
              {...shared}
              stroke={colour}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          );
        })}
        {children}
      </ComposedChart>
    </ChartContainer>
  );
}

export { ComboChart };
