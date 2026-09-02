"use client";

import * as React from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
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

/* RadarChart — a spider chart: how a few entities compare across many
   dimensions at once.
   ---------------------------------------------------------------------------
   Each spoke is a dimension, each closed polygon is one entity. Net-new in
   1.0 — 0.11 had no polar chart at all.

   It keeps `LineChart`'s shape, `config` + `data` + a key naming a row field,
   but the two are transposed against every other wrapper here and that is the
   thing to get right:

     `config` keys  ->  the polygons (entities), coloured off the ramp
     `data` rows    ->  the spokes (dimensions), one field per entity
     `dimensionKey` ->  the row field holding the spoke's label

   So a two-product, five-capability chart is five rows of two fields, not two
   rows of five. Reading it the other way round draws two spokes and no polygon.

   Two polygons overlay clearly and three are the practical ceiling; past that
   the fills muddy each other whatever `fillOpacity` says. The stroke stays at
   full strength for exactly that reason — the fill is the hint, the outline is
   the reading. */
function RadarChart({
  className,
  config,
  data,
  dimensionKey,
  grid = true,
  radiusAxis = false,
  fillOpacity = 0.2,
  domain,
  legend,
  margin = { top: 8, right: 8, bottom: 8, left: 8 },
  children,
  ...props
}: Omit<React.ComponentProps<typeof ChartContainer>, "config" | "children"> & {
  config: ChartConfig;
  /** One row per dimension, each carrying its label plus one field per entity. */
  data: Record<string, unknown>[];
  /** Row field the spoke labels are read from. */
  dimensionKey: string;
  grid?: boolean;
  /** Print the radius ticks. Off by default — they are noisy on a small chart. */
  radiusAxis?: boolean;
  /** Fill under each polygon's stroke. The stroke is always full strength. */
  fillOpacity?: number;
  /**
   * Pin the radius scale. Left off, recharts fits it to the data on every
   * render, which makes two charts side by side silently incomparable.
   */
  domain?: [number, number];
  /** Defaults on once `config` names more than one entity. */
  legend?: boolean;
  margin?: React.ComponentProps<typeof RechartsRadarChart>["margin"];
  /** Extra recharts children — a second `PolarRadiusAxis`, a `Label`. */
  children?: React.ReactNode;
}) {
  const series = Object.keys(config);

  return (
    <ChartContainer
      config={config}
      // `--square` is load-bearing, not cosmetic: the polar radius resolves
      // against the shorter side, so a box with only its height capped leaves
      // both axes indefinite, the container measures 0 and recharts never draws.
      className={cx(
        "ds-chart-container--square ds-radar-chart-root",
        className,
      )}
      {...props}
    >
      <RechartsRadarChart accessibilityLayer data={data} margin={margin}>
        {grid ? <PolarGrid /> : null}
        <PolarAngleAxis dataKey={dimensionKey} />
        {/* Always mounted, because this axis owns the radius scale — `domain`
            has nowhere else to land. `radiusAxis` only decides whether its
            ticks are drawn. */}
        <PolarRadiusAxis
          domain={domain}
          tick={radiusAxis}
          tickLine={false}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        {(legend ?? series.length > 1) ? (
          <ChartLegend content={<ChartLegendContent />} />
        ) : null}
        {series.map((key, i) => (
          <Radar
            key={key}
            dataKey={key}
            stroke={seriesColor(key, i)}
            fill={seriesColor(key, i)}
            fillOpacity={fillOpacity}
            strokeWidth={2}
          />
        ))}
        {children}
      </RechartsRadarChart>
    </ChartContainer>
  );
}

export { RadarChart };
