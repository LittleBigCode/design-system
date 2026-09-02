"use client";

import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
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

/* LineChart — one or more series over a category axis.
   ---------------------------------------------------------------------------
   The finished line chart over recharts, replacing 0.11's hand-rolled SVG
   LineChart. 0.11's props map onto `ChartConfig` rather than surviving
   verbatim, because that object is already how this system names and colours a
   series and how the tooltip and legend look their labels up:

     0.11 `series` / `name` / `color`  ->  one `config` entry per series, keyed
                                            by the field name in each data row
     0.11 `data` (number[])            ->  `data`, row objects as recharts wants
     0.11 `labels` (string[])          ->  `xAxisKey`, the row field holding them
     0.11 `width` / `height`           ->  `className`; the container is
                                            responsive, so it is sized by its box

   `dots` and `grid` survive as they were. A series with no colour of its own
   falls back to the `--ds-chart-*` ramp, so a config of bare labels still
   draws. */
function LineChart({
  className,
  config,
  data,
  xAxisKey,
  grid = true,
  dots = true,
  legend,
  margin = { top: 8, right: 20, bottom: 0, left: 20 },
  children,
  ...props
}: Omit<React.ComponentProps<typeof ChartContainer>, "config" | "children"> & {
  config: ChartConfig;
  data: Record<string, unknown>[];
  /** Row field the x axis reads its categories from. Omitted, there is no axis. */
  xAxisKey?: string;
  grid?: boolean;
  dots?: boolean;
  margin?: React.ComponentProps<typeof RechartsLineChart>["margin"];
  /** Defaults on once `config` names more than one series. */
  legend?: boolean;
  /** Extra recharts children — a `ReferenceLine`, a second axis. */
  children?: React.ReactNode;
}) {
  const series = Object.keys(config);

  return (
    <ChartContainer
      config={config}
      className={cx("ds-chart-container--plot", className)}
      {...props}
    >
      {/* The default side margins are what stop the first and last x tick from
          being clipped: recharts centres every tick on its point, including the
          two on the edges, and its surface is overflow:hidden. 20px clears a
          label of about five characters; a longer one wants a wider `margin`. */}
      <RechartsLineChart accessibilityLayer data={data} margin={margin}>
        {grid ? <CartesianGrid vertical={false} /> : null}
        {xAxisKey ? (
          <XAxis
            dataKey={xAxisKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            // Recharts will happily print all 24 hours of a day on top of each
            // other. Thinning the run while pinning both ends keeps a dense
            // series readable without the caller having to count its points.
            interval="preserveStartEnd"
            minTickGap={16}
          />
        ) : null}
        <ChartTooltip content={<ChartTooltipContent />} />
        {(legend ?? series.length > 1) ? (
          <ChartLegend content={<ChartLegendContent />} />
        ) : null}
        {series.map((key, i) => (
          <Line
            key={key}
            dataKey={key}
            stroke={seriesColor(key, i)}
            strokeWidth={2}
            dot={dots}
            activeDot={{ r: 4 }}
          />
        ))}
        {children}
      </RechartsLineChart>
    </ChartContainer>
  );
}

export { LineChart };
