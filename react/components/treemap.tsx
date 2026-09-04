"use client";

import * as React from "react";
import { Treemap as RechartsTreemap, type TreemapNode } from "recharts";

import { seriesColor } from "../lib/chart-series.js";
import { cx } from "../lib/cx.js";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart.js";

/** One node. `children` makes it a group; a leaf carries a value instead. */
export type TreemapDatum = {
  children?: TreemapDatum[];
  [key: string]: unknown;
};

/** Below these a tile has no room for text, so the label is dropped. */
const LABEL_MIN_WIDTH = 52;
const LABEL_MIN_HEIGHT = 24;
/** A second line of text needs about this much again. */
const VALUE_MIN_HEIGHT = 42;

/**
 * Tiles are a wash of their hue rather than a solid fill, and that is a
 * contrast decision, not a stylistic one: the label then sits on something
 * close to the page background, so `.ds-treemap-tile-label`'s `--ds-ink` clears
 * AA on every ramp slot and in both themes. A solid fill would need per-hue
 * label colours, and `--ds-chart-6` (amber) has no text colour that works
 * against it and against `--ds-chart-1` (brand red) both.
 */
const GROUP_WASH = 0.3;
const CHILD_WASH_STEP = 0.05;
const CHILD_WASH_FLOOR = 0.12;

/**
 * A child's colour is its parent's, dimmed a step per position, which is what
 * makes a group read as a group without inventing tokens for every combination.
 */
function tileWash(depth: number, index: number) {
  if (depth < 2) return GROUP_WASH;
  return Math.max(CHILD_WASH_FLOOR, GROUP_WASH - index * CHILD_WASH_STEP);
}

/**
 * Recharts hands the renderer the node's **parent** as `root`, which is the only
 * way a child can find the hue it should be a tint of.
 */
function tileColor(node: TreemapNode) {
  if (node.depth <= 1) return seriesColor(node.name, node.index);
  const parent = node.root;
  return parent ? seriesColor(parent.name, parent.index) : seriesColor("", 0);
}

function TreemapTile({
  node,
  showLabels,
  formatValue,
}: {
  node: TreemapNode;
  showLabels: boolean;
  formatValue: (value: number) => string;
}) {
  const { depth, x, y, width, height, name, value } = node;
  // Depth 0 is the whole plot area, drawn before everything else and then
  // covered by it — painting it would only tint the entire chart.
  if (depth === 0) return <g />;

  const isGroup = Boolean(node.children?.length);
  const colour = tileColor(node);
  const label =
    showLabels &&
    !isGroup &&
    width > LABEL_MIN_WIDTH &&
    height > LABEL_MIN_HEIGHT;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={colour}
        // A group's area is entirely covered by its children, so it contributes
        // the frame that separates one group from the next and nothing else.
        fillOpacity={isGroup ? 0 : tileWash(depth, node.index)}
        stroke={colour}
        strokeWidth={isGroup ? 2 : 1}
      />
      {label ? (
        <text
          x={x + 8}
          y={y + 8}
          className="ds-treemap-tile-label"
          dominantBaseline="hanging"
        >
          {name}
          {height > VALUE_MIN_HEIGHT ? (
            <tspan x={x + 8} dy={15} className="ds-treemap-tile-value">
              {formatValue(value)}
            </tspan>
          ) : null}
        </text>
      ) : null}
    </g>
  );
}

/* Treemap — how a weighted hierarchy divides up when there are too many parts
   for a pie.
   ---------------------------------------------------------------------------
   Cloud spend by service, storage by team then by project, bundle size by
   module. Net-new in 1.0. Not `Tree`, which is a navigation control — the two
   share nothing but a prefix.

   A pie stops working past six or seven slices; a treemap keeps reading into
   the dozens and gets a second level for free. Two levels is the ceiling, and
   deliberately so: at three the tiles are too small to label and the form stops
   informing.

   It keeps the shared `config` + `data` + key-prop contract, with the colour on
   the row rather than the series — the pie and donut path — because a treemap
   is coloured per node. `config` is optional; a node with no entry takes the
   next ramp slot. */
function Treemap({
  className,
  config,
  data,
  nameKey = "name",
  valueKey = "value",
  aspectRatio = 4 / 3,
  showLabels = true,
  formatValue = (value) => value.toLocaleString(),
  children,
  ...props
}: Omit<React.ComponentProps<typeof ChartContainer>, "config" | "children"> & {
  /** Optional, keyed by top-level node name — names or colours one group. */
  config?: ChartConfig;
  /** Nested at most two deep: groups of leaves, or leaves on their own. */
  data: TreemapDatum[];
  /** Node field holding the label. */
  nameKey?: string;
  /** Leaf field holding the weight. A group's weight is its children's sum. */
  valueKey?: string;
  /** Tiling ratio recharts aims each tile at. */
  aspectRatio?: number;
  /** Tile labels, dropped on their own for tiles with no room for text. */
  showLabels?: boolean;
  /** How the figure under each label is printed. */
  formatValue?: (value: number) => string;
  /** Extra recharts children — a `Legend`, a second `Tooltip`. */
  children?: React.ReactNode;
}) {
  return (
    <ChartContainer
      config={config ?? {}}
      className={cx("ds-chart-container--plot ds-treemap-root", className)}
      {...props}
    >
      <RechartsTreemap
        data={data}
        dataKey={valueKey}
        nameKey={nameKey}
        aspectRatio={aspectRatio}
        content={(node) => (
          <TreemapTile
            node={node}
            showLabels={showLabels}
            formatValue={formatValue}
          />
        )}
      >
        <ChartTooltip content={<ChartTooltipContent nameKey={nameKey} />} />
        {children}
      </RechartsTreemap>
    </ChartContainer>
  );
}

export { Treemap };
