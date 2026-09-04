"use client";

import * as React from "react";

import { cx } from "../lib/cx.js";

/** One cell of the grid form. Missing pairs stay missing — do not pad with 0. */
export type HeatmapCell = { x: string; y: string; value: number };

/** One day of the calendar form. Gaps in the range render as empty. */
export type HeatmapDay = { date: string; value: number };

const HEAT_STEPS = 5;
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
/** Contribution-graph convention: label every other row, or they collide. */
const WEEKDAY_LABELLED = [0, 2, 4];
const DAY_MS = 86_400_000;

/**
 * Dates are parsed to UTC noon rather than through `new Date(iso)`: a bare
 * `YYYY-MM-DD` is read as UTC midnight, which lands on the previous day for
 * anyone west of Greenwich and shifts the whole calendar by a column.
 */
function parseDay(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return Date.UTC(year, (month ?? 1) - 1, day ?? 1, 12);
}

function isoDay(stamp: number) {
  return new Date(stamp).toISOString().slice(0, 10);
}

/** Monday-first weekday index, 0–6. */
function weekdayOf(stamp: number) {
  return (new Date(stamp).getUTCDay() + 6) % 7;
}

/** The quantised step a value falls in, 1–`steps`. 0 means no cell at all. */
function heatStep(value: number, max: number, steps: number) {
  if (max <= 0) return 1;
  // A present zero is still a reading, so it takes the lowest step rather than
  // disappearing into the empty state.
  if (value <= 0) return 1;
  return Math.min(steps, Math.max(1, Math.ceil((value / max) * steps)));
}

function stepColor(step: number, steps: number) {
  // The tokens are a fixed five, so a shorter scale walks the ramp rather than
  // crowding into its first entries.
  const slot = Math.min(
    HEAT_STEPS,
    Math.max(1, Math.round((step / steps) * HEAT_STEPS)),
  );
  return `var(--ds-heat-${slot})`;
}

function HeatmapTile({
  step,
  steps,
  size,
  label,
}: {
  step: number;
  steps: number;
  size: number;
  label: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      title={label}
      className="ds-heatmap-tile"
      // An empty cell is a ring with nothing in it, which is a different kind
      // of thing from the lowest step rather than a paler version of it.
      data-empty={step === 0 ? "" : undefined}
      style={{
        width: size,
        height: size,
        backgroundColor: step === 0 ? "transparent" : stepColor(step, steps),
      }}
    />
  );
}

function HeatmapLegend({ steps }: { steps: number }) {
  return (
    <div className="ds-heatmap-legend">
      <span>Less</span>
      {Array.from({ length: steps }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className="ds-heatmap-legend-swatch"
          style={{ backgroundColor: stepColor(i + 1, steps) }}
        />
      ))}
      <span>More</span>
    </div>
  );
}

type SharedProps = {
  /** The sequential scale. `max` pins it so two heatmaps compare. */
  scale?: { steps?: number; max?: number };
  /** Cell edge in px. Cells stay square. */
  cellSize?: number;
  /** Gap between cells in px. */
  gap?: number;
  /** The "less to more" step legend. Without it the colours mean nothing. */
  legend?: boolean;
  /** What a cell with no reading announces. */
  emptyLabel?: string;
  /** How a value is spoken in a cell's accessible name. */
  formatValue?: (value: number) => string;
  /**
   * `"grid"` reads `HeatmapCell` rows, `"calendar"` reads `HeatmapDay` rows.
   * The two are not a discriminated union on purpose: the docs Workbench drives
   * this component through `Partial<ComponentProps<…>>`, and a union collapses
   * to `never` under that spread.
   */
  layout?: "grid" | "calendar";
  data: HeatmapCell[] | HeatmapDay[];
};

/* Heatmap — where density concentrates across two axes.
   ---------------------------------------------------------------------------
   Activity per weekday-by-hour, errors per service-by-day, a year of
   contributions. Net-new in 1.0, and the only form in the set that encodes
   magnitude as colour rather than position — which is why it scales to hundreds
   of cells where a bar chart cannot, and why it is the wrong reach when an
   exact value matters.

   Plain CSS grid and divs. recharts has no heatmap primitive, and the shape is
   a grid of coloured rectangles with labels, which is what CSS grid already is;
   there is no `ChartContainer` here because there is no responsive SVG to
   measure.

     `layout="grid"`      ->  `{ x, y, value }` rows, sparse. A missing pair
                               renders empty, not zero, and the two look
                               different on purpose
     `layout="calendar"`  ->  `{ date, value }` rows. The week columns and
                               weekday rows are derived from the range, so the
                               caller never computes a week index

   The ramp is `--ds-heat-1..5`, sequential and one hue — not the categorical
   `--ds-chart-*` ramp, because reading a categorical ramp as a scale is the
   classic dataviz error.

   Colour is the only encoding, so every cell carries its own accessible name
   with both axes and its value — `role="img"` plus `aria-label`, with the same
   string as `title` for the mouse. A grid of unlabelled divs is a critical axe
   failure, and `Tooltip` is not used here because a year of days is 365
   focusable triggers, which is worse for a keyboard than one label per cell. */
function Heatmap({
  className,
  scale,
  cellSize = 16,
  gap = 3,
  legend = true,
  emptyLabel = "no data",
  formatValue = (value) => value.toLocaleString(),
  layout = "grid",
  data,
  ...rest
}: Omit<React.ComponentProps<"div">, "children"> & SharedProps) {
  const steps = scale?.steps ?? HEAT_STEPS;
  // The prop type is loose enough to let a calendar be handed grid rows, so each
  // form keeps only the rows it can actually read rather than plotting NaN.
  const rows = data.filter((row) =>
    layout === "calendar" ? "date" in row : "x" in row,
  );

  const body = !rows.length ? null : layout === "calendar" ? (
    <CalendarBody
      data={rows as HeatmapDay[]}
      steps={steps}
      max={scale?.max}
      cellSize={cellSize}
      gap={gap}
      emptyLabel={emptyLabel}
      formatValue={formatValue}
    />
  ) : (
    <GridBody
      data={rows as HeatmapCell[]}
      steps={steps}
      max={scale?.max}
      cellSize={cellSize}
      gap={gap}
      emptyLabel={emptyLabel}
      formatValue={formatValue}
    />
  );

  return (
    <div data-slot="heatmap" className={cx("ds-heatmap", className)} {...rest}>
      <div className="ds-heatmap-scroll">{body}</div>
      {legend ? <HeatmapLegend steps={steps} /> : null}
    </div>
  );
}

type BodyProps = {
  steps: number;
  max?: number;
  cellSize: number;
  gap: number;
  emptyLabel: string;
  formatValue: (value: number) => string;
};

function GridBody({
  data,
  steps,
  max,
  cellSize,
  gap,
  emptyLabel,
  formatValue,
}: BodyProps & { data: HeatmapCell[] }) {
  const columns = [...new Set(data.map((cell) => cell.x))];
  const rows = [...new Set(data.map((cell) => cell.y))];
  const values = new Map(data.map((cell) => [`${cell.x} ${cell.y}`, cell]));
  const ceiling = max ?? Math.max(...data.map((cell) => cell.value), 0);

  return (
    <div
      className="ds-heatmap-grid"
      style={{
        gridTemplateColumns: `auto repeat(${columns.length}, ${cellSize}px)`,
        gap,
      }}
    >
      <div />
      {columns.map((column) => (
        <div key={column} className="ds-heatmap-grid-column">
          {column}
        </div>
      ))}
      {rows.map((row) => (
        <React.Fragment key={row}>
          <div className="ds-heatmap-grid-row-label">{row}</div>
          {columns.map((column) => {
            const cell = values.get(`${column} ${row}`);
            return (
              <HeatmapTile
                key={column}
                step={cell ? heatStep(cell.value, ceiling, steps) : 0}
                steps={steps}
                size={cellSize}
                label={
                  cell
                    ? `${row}, ${column}: ${formatValue(cell.value)}`
                    : `${row}, ${column}: ${emptyLabel}`
                }
              />
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}

function CalendarBody({
  data,
  steps,
  max,
  cellSize,
  gap,
  emptyLabel,
  formatValue,
}: BodyProps & { data: HeatmapDay[] }) {
  const values = new Map(data.map((day) => [day.date, day.value]));
  const stamps = data.map((day) => parseDay(day.date));
  const ceiling = max ?? Math.max(...data.map((day) => day.value), 0);

  // The grid starts on the Monday at or before the first reading and ends on the
  // Sunday at or after the last, so every column is a whole week.
  const start = Math.min(...stamps) - weekdayOf(Math.min(...stamps)) * DAY_MS;
  const last = Math.max(...stamps);
  const end = last + (6 - weekdayOf(last)) * DAY_MS;
  const weeks = Math.round((end - start) / DAY_MS + 1) / 7;

  const columns = Array.from({ length: weeks }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => start + (week * 7 + day) * DAY_MS),
  );

  return (
    <div className="ds-heatmap-calendar">
      <div
        className="ds-heatmap-calendar-weekdays"
        style={{ gridTemplateRows: `repeat(7, ${cellSize}px)`, gap }}
      >
        {WEEKDAYS.map((weekday, i) => (
          <div key={weekday} className="ds-heatmap-calendar-weekday">
            {WEEKDAY_LABELLED.includes(i) ? weekday : null}
          </div>
        ))}
      </div>
      <div className="ds-heatmap-calendar-body">
        <div
          className="ds-heatmap-calendar-months"
          style={{
            gridTemplateColumns: `repeat(${weeks}, ${cellSize}px)`,
            gap,
          }}
        >
          {columns.map((week, i) => {
            const month = new Date(week[0]).getUTCMonth();
            const previous =
              i === 0 ? -1 : new Date(columns[i - 1][0]).getUTCMonth();
            return (
              <div key={i} className="ds-heatmap-calendar-month" aria-hidden>
                {month === previous
                  ? null
                  : new Date(week[0]).toLocaleDateString(undefined, {
                      month: "short",
                      timeZone: "UTC",
                    })}
              </div>
            );
          })}
        </div>
        <div
          className="ds-heatmap-calendar-days"
          style={{
            gridAutoFlow: "column",
            gridTemplateRows: `repeat(7, ${cellSize}px)`,
            gap,
          }}
        >
          {columns.flat().map((stamp) => {
            const iso = isoDay(stamp);
            const value = values.get(iso);
            return (
              <HeatmapTile
                key={iso}
                step={value === undefined ? 0 : heatStep(value, ceiling, steps)}
                steps={steps}
                size={cellSize}
                label={
                  value === undefined
                    ? `${iso}: ${emptyLabel}`
                    : `${iso}: ${formatValue(value)}`
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { Heatmap };
