"use client";

import * as React from "react";
import { Pie, PieChart as RechartsPieChart } from "recharts";

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

/* PieChart — parts of one whole, no hole.
   ---------------------------------------------------------------------------
   The finished pie over recharts, replacing 0.11's hand-rolled SVG PieChart.
   0.11's props land like this:

     0.11 `value` / `label`  ->  `valueKey` / `nameKey`, the row fields holding
                                  the number and the slice name
     0.11 `color`            ->  a `config` entry per slice name
     0.11 `legend`           ->  `legend`
     0.11 `size`             ->  `className`; the container is responsive, so
                                  the pie is sized by its box, not a px number

   `nameKey` is also what the tooltip and legend look their labels up by, which
   is why a slice name that is not a `config` key renders a swatch and no text.

   `.ds-chart-container--square` is what gives the ratio a definite height to
   resolve against; retune it with `--ds-chart-height` rather than a competing
   height rule. */
function PieChart({
  className,
  config,
  data,
  valueKey,
  nameKey,
  legend = true,
  children,
  ...props
}: Omit<React.ComponentProps<typeof ChartContainer>, "config" | "children"> & {
  config: ChartConfig;
  data: Record<string, unknown>[];
  /** Row field holding the slice's number. */
  valueKey: string;
  /** Row field holding the slice's name — the key into `config`. */
  nameKey: string;
  legend?: boolean;
  /** Extra recharts children — a second `Pie`, a `ReferenceLine`. */
  children?: React.ReactNode;
}) {
  return (
    <ChartContainer
      config={config}
      className={cx(
        "ds-pie-chart-root",
        "ds-chart-container--square",
        className,
      )}
      {...props}
    >
      <RechartsPieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey={nameKey} />} />
        <Pie
          data={withSliceColors(data, nameKey)}
          dataKey={valueKey}
          nameKey={nameKey}
          outerRadius="90%"
        />
        {legend ? (
          <ChartLegend content={<ChartLegendContent nameKey={nameKey} />} />
        ) : null}
        {children}
      </RechartsPieChart>
    </ChartContainer>
  );
}

export { PieChart };
