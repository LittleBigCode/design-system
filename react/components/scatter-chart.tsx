"use client";

import * as React from "react";
import {
  CartesianGrid,
  Scatter,
  ScatterChart as RechartsScatterChart,
  XAxis,
  YAxis,
  ZAxis,
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

/**
 * Area, not radius: the eye reads a bubble's area as its magnitude, so sizing by
 * radius doubles the apparent value. recharts' `ZAxis` range is in area units,
 * which is the honest encoding, and 40 is a floor small points stay visible at.
 */
const BUBBLE_RANGE: [number, number] = [40, 400];

/* ScatterChart — whether two quantities correlate, and where the outliers sit.
   ---------------------------------------------------------------------------
   Price against rating, page weight against bounce rate, tenure against
   output. Net-new in 1.0, and the only chart in the set that plots a quantity
   against another quantity rather than one quantity against a category or a
   date.

   It keeps `LineChart`'s `config` + `data` shape. What differs:

     `config` keys  ->  the groups, each drawn as its own `Scatter` with its own
                         ramp colour. `groupKey` names the row field that says
                         which group a row belongs to
     `xKey`/`yKey`  ->  the two quantitative fields, replacing `xAxisKey`
     `sizeKey`      ->  a third variable. Present, this is a bubble chart

   `data` is one flat array with a `groupKey` field rather than an array per
   group, which matches how every other wrapper here takes data.

   Both axes are pinned to `type="number"`. recharts defaults `XAxis` to a
   category scale, which spaces the points evenly and collapses a scatter into
   columns — a chart that draws and lies. `xLabel`/`yLabel` are surfaced because
   a scatter with unlabelled axes is unreadable in a way a time series is not. */
function ScatterChart({
  className,
  config,
  data,
  xKey,
  yKey,
  sizeKey,
  groupKey,
  xLabel,
  yLabel,
  grid = true,
  legend,
  margin = { top: 8, right: 16, bottom: 16, left: 8 },
  children,
  ...props
}: Omit<React.ComponentProps<typeof ChartContainer>, "config" | "children"> & {
  config: ChartConfig;
  /** One flat array. `groupKey` splits it; without one, every row is one group. */
  data: Record<string, unknown>[];
  /** Row field for the horizontal quantity. */
  xKey: string;
  /** Row field for the vertical quantity. */
  yKey: string;
  /** Row field for the bubble's area. Omitted, the marks are a fixed size. */
  sizeKey?: string;
  /** Row field naming which `config` entry a row belongs to. */
  groupKey?: string;
  /** Caption under the x axis, and the name the tooltip gives that quantity. */
  xLabel?: string;
  /** Caption beside the y axis, and the name the tooltip gives that quantity. */
  yLabel?: string;
  grid?: boolean;
  /** Defaults on once `groupKey` splits the rows into more than one group. */
  legend?: boolean;
  margin?: React.ComponentProps<typeof RechartsScatterChart>["margin"];
  /** Extra recharts children — a `ReferenceLine` trend or threshold. */
  children?: React.ReactNode;
}) {
  // Without a `groupKey` there is nothing to split on, so the first config entry
  // names the whole set rather than every entry redrawing the same points.
  const groups = groupKey
    ? Object.keys(config)
    : Object.keys(config).slice(0, 1);

  return (
    <ChartContainer
      config={config}
      className={cx(
        "ds-chart-container--plot ds-scatter-chart-root",
        className,
      )}
      {...props}
    >
      <RechartsScatterChart accessibilityLayer margin={margin}>
        {grid ? <CartesianGrid /> : null}
        {/* Both axes fit the data rather than anchoring at zero. A bar chart is
            a magnitude and has to start at zero to be honest; a scatter is a
            *relationship*, and zero-anchoring squashes the cloud into a corner —
            life expectancy over 76–83 against a 0–100 axis shows no correlation
            at all. This is why there is no `max` here as `BarChart` has. */}
        <XAxis
          type="number"
          dataKey={xKey}
          name={xLabel ?? xKey}
          domain={["auto", "auto"]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          label={
            xLabel
              ? {
                  value: xLabel,
                  position: "insideBottom",
                  offset: -12,
                  fontSize: 11,
                }
              : undefined
          }
        />
        <YAxis
          type="number"
          dataKey={yKey}
          name={yLabel ?? yKey}
          domain={["auto", "auto"]}
          tickLine={false}
          axisLine={false}
          width={44}
          label={
            yLabel
              ? {
                  value: yLabel,
                  angle: -90,
                  position: "insideLeft",
                  fontSize: 11,
                }
              : undefined
          }
        />
        {sizeKey ? (
          <ZAxis type="number" dataKey={sizeKey} range={BUBBLE_RANGE} />
        ) : null}
        <ChartTooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={<ChartTooltipContent />}
        />
        {/* Every `Scatter` shares one `dataKey` — the y field — so the legend's
            default lookup would resolve all groups to the same config entry.
            `nameKey="name"` sends it through each `Scatter`'s own `name`, which
            is the group. */}
        {(legend ?? groups.length > 1) ? (
          <ChartLegend content={<ChartLegendContent nameKey="name" />} />
        ) : null}
        {groups.map((key, i) => (
          <Scatter
            key={key}
            name={key}
            dataKey={yKey}
            data={
              groupKey
                ? data.filter((row) => String(row[groupKey]) === key)
                : data
            }
            fill={seriesColor(key, i)}
            fillOpacity={0.75}
          />
        ))}
        {children}
      </RechartsScatterChart>
    </ChartContainer>
  );
}

export { ScatterChart };
