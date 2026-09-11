"use client";

import * as React from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import { seriesColor, STATUS_COLORS } from "../lib/chart-series.js";
import { cx } from "../lib/cx.js";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart.js";

/** What the wrapper derives from one caller row. */
type Step = {
  name: string;
  /** Running total before this step, drawn transparent so the delta floats. */
  base: number;
  /** Bar height. Always positive; the sign lives in `signed`. */
  delta: number;
  /** The caller's value, sign intact — what the tooltip prints. */
  signed: number;
  /** Running total after this step, and where this step's connector sits. */
  running: number;
  isTotal: boolean;
  fill: string;
};

/**
 * Totals take a slot off the chart ramp rather than a status tint, because they
 * are not good or bad news — they are the thing the deltas add up to. Slot 4 is
 * the marron, the least loaded colour in the ramp; a `total` entry in `config`
 * overrides it.
 */
const TOTAL_COLOR = seriesColor("total", 3);

/**
 * The caller passes raw signed values and never a base. Working the bases out
 * here — including the total rows, which restart from zero instead of stacking
 * on the running figure — is the whole component.
 */
function toSteps(
  data: Record<string, unknown>[],
  nameKey: string,
  valueKey: string,
  totalKeys: string[],
): Step[] {
  let running = 0;

  return data.map((row) => {
    const name = String(row[nameKey]);
    const signed = Number(row[valueKey]) || 0;
    const isTotal = totalKeys.includes(name);

    if (isTotal) {
      // A total is drawn from zero: it restates the running figure rather than
      // moving it, so its own value becomes the running total from here.
      running = signed;
      return {
        name,
        base: 0,
        delta: signed,
        signed,
        running,
        isTotal,
        fill: TOTAL_COLOR,
      };
    }

    // A fall hangs from where the running total was; a rise sits on top of it.
    const base = signed < 0 ? running + signed : running;
    running += signed;

    return {
      name,
      base,
      delta: Math.abs(signed),
      signed,
      running,
      isTotal,
      fill: signed < 0 ? STATUS_COLORS.danger : STATUS_COLORS.success,
    };
  });
}

/* WaterfallChart — how signed deltas accumulate from a starting value to an
   ending one.
   ---------------------------------------------------------------------------
   Opening ARR through new, expansion, contraction and churn to closing ARR;
   budget to actuals through each variance; headcount month over month. Net-new
   in 1.0, and recharts has no waterfall primitive.

   A bar chart shows the deltas but hides the running total; a line shows the
   total but hides what moved it. This shows both, as two stacked bars per row —
   a transparent one carrying the running base, and the visible delta floating
   on top of it.

     `totalKeys`   ->  rows that restate the total rather than move it. Without
                        it the closing bar stacks on the running figure and
                        floats at roughly twice its true height
     `connectors`  ->  the ticks joining one bar's edge to the next bar's base.
                        They are what makes a waterfall read as a waterfall

   Colour is semantic, not a series ramp: rises take `--ds-success`, falls
   `--ds-danger`, totals a neutral ramp slot. That is `BarChart`'s `statusKey`
   axis reused rather than a second vocabulary — but per-row through the row's
   own `fill`, which recharts reads on the visible bar only because the base bar
   is hidden with `fillOpacity` rather than a colour.

   The running total is assumed to stay at or above zero. A sequence that
   crosses into negative territory would need a base below the axis, which a
   stack cannot express — split it into two charts instead. */
function WaterfallChart({
  className,
  config,
  data,
  nameKey,
  valueKey,
  totalKeys = [],
  connectors = true,
  grid = true,
  formatValue = (value) => value.toLocaleString(),
  margin = { top: 8, right: 20, bottom: 0, left: 20 },
  children,
  ...props
}: Omit<React.ComponentProps<typeof ChartContainer>, "config" | "children"> & {
  /** Optional — a `total` entry recolours the total bars. */
  config?: ChartConfig;
  /** One row per step, in order, each with a label and a signed value. */
  data: Record<string, unknown>[];
  /** Row field holding the step's label. */
  nameKey: string;
  /** Row field holding the step's signed value. */
  valueKey: string;
  /** Labels of the rows that are totals rather than deltas. */
  totalKeys?: string[];
  connectors?: boolean;
  grid?: boolean;
  /** How figures are printed in the tooltip. Signs are added for you. */
  formatValue?: (value: number) => string;
  margin?: React.ComponentProps<typeof ComposedChart>["margin"];
  /** Extra recharts children — a `ReferenceLine`, a `Label`. */
  children?: React.ReactNode;
}) {
  const steps = toSteps(data, nameKey, valueKey, totalKeys);

  const signedLabel = (step: Step) =>
    step.isTotal || step.signed < 0
      ? formatValue(step.signed)
      : `+${formatValue(step.signed)}`;

  return (
    <ChartContainer
      config={config ?? {}}
      className={cx("ds-chart-container--plot", className)}
      {...props}
    >
      <ComposedChart accessibilityLayer data={steps} margin={margin}>
        {grid ? <CartesianGrid vertical={false} /> : null}
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval={0}
        />
        <YAxis tickLine={false} axisLine={false} width={52} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              hideIndicator
              labelFormatter={(_label, payload) =>
                String(payload?.[0]?.payload?.name ?? "")
              }
              formatter={(_value, _name, item) => {
                const step = item.payload as Step;
                return (
                  <div className="ds-waterfall-chart-tooltip">
                    <div className="ds-waterfall-chart-tooltip-row">
                      <span className="ds-waterfall-chart-tooltip-label">
                        {step.isTotal ? "Total" : "Change"}
                      </span>
                      <span className="ds-waterfall-chart-tooltip-value">
                        {signedLabel(step)}
                      </span>
                    </div>
                    {step.isTotal ? null : (
                      <div className="ds-waterfall-chart-tooltip-row">
                        <span className="ds-waterfall-chart-tooltip-label">
                          Running
                        </span>
                        <span className="ds-waterfall-chart-tooltip-value-muted">
                          {formatValue(step.running)}
                        </span>
                      </div>
                    )}
                  </div>
                );
              }}
            />
          }
        />
        {/* The offset, and excluded from the tooltip outright — a row reading
            "base: 4200" is the tell that this was done wrong. It is hidden with
            `fillOpacity` rather than a transparent `fill`, because the row's own
            `fill` (the delta's tone) would win over any fill set here. */}
        <Bar
          dataKey="base"
          stackId="waterfall"
          fillOpacity={0}
          tooltipType="none"
          legendType="none"
        />
        {/* The tone rides on the row as recharts' own `fill`, the same per-row
            path `BarChart`'s `statusKey` takes; the `fill` here is only the
            fallback for a row that somehow carries none.

            Both halves of the stack have to agree about animating. They are one
            bar — an offset and the delta floating on it — so animating the
            visible half against a static offset would detach the two for the
            length of the transition. */}
        <Bar dataKey="delta" stackId="waterfall" fill={TOTAL_COLOR} />
        {connectors
          ? steps.slice(0, -1).map((step, i) => (
              <ReferenceLine
                key={`connector-${step.name}`}
                segment={[
                  { x: step.name, y: step.running },
                  { x: steps[i + 1].name, y: step.running },
                ]}
                stroke="var(--ds-chart-4)"
                strokeDasharray="3 3"
                strokeWidth={1}
                ifOverflow="visible"
              />
            ))
          : null}
        {children}
      </ComposedChart>
    </ChartContainer>
  );
}

export { WaterfallChart };
