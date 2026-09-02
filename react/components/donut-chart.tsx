"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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

/** The ring's centre, from whichever viewBox shape recharts hands over. */
function centreOf(
  viewBox: Record<string, unknown>,
): [number, number] | undefined {
  if (typeof viewBox.cx === "number" && typeof viewBox.cy === "number") {
    return [viewBox.cx, viewBox.cy];
  }
  const { x, y, width, height } = viewBox;
  if (
    typeof x === "number" &&
    typeof y === "number" &&
    typeof width === "number" &&
    typeof height === "number"
  ) {
    return [x + width / 2, y + height / 2];
  }
  return undefined;
}

/* DonutChart — `PieChart` with the middle cut out and a figure in the hole.
   ---------------------------------------------------------------------------
   Replaces 0.11's hand-rolled SVG DonutChart. 0.11's props land like
   PieChart's, plus:

     0.11 `centerLabel`  ->  `centerLabel`, with `centerCaption` under it
     0.11 `thickness`    ->  `thickness`, re-read as a percentage of the chart
                              radius rather than px, because the container is
                              responsive and a px ring would not scale with it

   The centre text follows `gauge.tsx`: a title-voiced figure with an uppercase
   faint caption below, which is already this system's answer for a value plus
   a caption inside a ring. */
function DonutChart({
  className,
  config,
  data,
  valueKey,
  nameKey,
  centerLabel,
  centerCaption,
  thickness = 30,
  legend = true,
  children,
  ...props
}: Omit<React.ComponentProps<typeof ChartContainer>, "config" | "children"> & {
  config: ChartConfig;
  data: Record<string, unknown>[];
  /** Row field holding the segment's number. */
  valueKey: string;
  /** Row field holding the segment's name — the key into `config`. */
  nameKey: string;
  /** Figure in the hole. Left off, the hole stays empty. */
  centerLabel?: React.ReactNode;
  /** Caption under the figure, in the uppercase register `Gauge` uses. */
  centerCaption?: React.ReactNode;
  /** Ring width, as a percentage of the chart radius. */
  thickness?: number;
  legend?: boolean;
  /** Extra recharts children — a second `Pie`, a `ReferenceLine`. */
  children?: React.ReactNode;
}) {
  const outer = 90;

  return (
    <ChartContainer
      config={config}
      className={cx(
        "ds-donut-chart-root",
        "ds-chart-container--square",
        className,
      )}
      {...props}
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey={nameKey} />} />
        <Pie
          data={withSliceColors(data, nameKey)}
          dataKey={valueKey}
          nameKey={nameKey}
          outerRadius={`${outer}%`}
          innerRadius={`${Math.max(0, outer - thickness)}%`}
        >
          {centerLabel != null ? (
            <Label
              position="center"
              content={({ viewBox }) => {
                if (!viewBox) return null;
                // recharts 3 hands a Pie's Label the *cartesian* plot box, not
                // the polar one with cx/cy, so the centre is derived. Its
                // height already excludes the legend, which is what keeps the
                // figure in the hole rather than below it.
                const centre = centreOf(viewBox);
                if (!centre) return null;
                const [cx, cy] = centre;
                // One <text> with tspans rather than two siblings: recharts
                // renders a Label's content as a single node, and a fragment
                // of two <text> elements is dropped.
                return (
                  <text x={cx} y={cy} textAnchor="middle">
                    <tspan
                      x={cx}
                      y={centerCaption != null ? cy - 6 : cy}
                      dominantBaseline="central"
                      className="ds-donut-chart-center-label"
                    >
                      {centerLabel}
                    </tspan>
                    {centerCaption != null ? (
                      <tspan
                        x={cx}
                        y={cy + 16}
                        dominantBaseline="central"
                        className="ds-donut-chart-center-caption"
                      >
                        {centerCaption}
                      </tspan>
                    ) : null}
                  </text>
                );
              }}
            />
          ) : null}
        </Pie>
        {legend ? (
          <ChartLegend content={<ChartLegendContent nameKey={nameKey} />} />
        ) : null}
        {children}
      </PieChart>
    </ChartContainer>
  );
}

export { DonutChart };
