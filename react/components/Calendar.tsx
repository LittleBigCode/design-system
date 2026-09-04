"use client"

import { cx } from "../lib/cx.js";
import { MonthGrid, buildWeeks, sameDay, startOfDay, toISO } from "../lib/monthGrid.js";
/* ----------------------------------------------------------------------------
   Calendar — a full-size month view that shows events inside day cells.
   Renders a 7-column month grid (with leading / trailing days from the
   neighbouring months), a head with the month label + prev / next icon buttons
   and an optional "Today" action, and a faint uppercase weekday row. Events are
   bucketed by day and rendered as small status-colored chips, capped with a
   "+N more" line. Navigate months with the icon buttons; click a day to select
   it. Works with a controlled `month` (+ onMonthChange) or an internal default.
   All date math is plain JS — no libraries. `value` / event `date` accept a Date
   or an ISO `yyyy-mm-dd` string. Styling: css/components/calendar-view.css.
   ---------------------------------------------------------------------------- */
import React from "react";

import type { HTMLAttributes } from "react";

export type DateLike = Date | string;

export type CalendarStatus = "success" | "warning" | "danger" | "info";

export interface CalendarEvent {
  /** Day the event lands on — a Date or an ISO `yyyy-mm-dd` string. */
  date: DateLike;
  /** Short label shown in the day-cell chip (truncated). */
  label: string;
  /** Recolors the chip's left bar + background tint. */
  status?: CalendarStatus;
}

export interface CalendarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Controlled month to display — any Date / ISO string within that month. */
  month?: DateLike;
  /** Selected day — a Date or an ISO `yyyy-mm-dd` string. */
  value?: DateLike | null;
  /** Events to place in day cells. */
  events?: CalendarEvent[];
  /** Fires when a day is clicked, with the picked Date and its ISO string. */
  onSelectDate?: (date: Date, iso: string) => void;
  /** Fires when the shown month changes, with the first day of the new month. */
  onMonthChange?: (month: Date) => void;
  /** First column of the week: 0 = Sunday … 6 = Saturday. Defaults to 1 (Mon). */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Max event chips per day before collapsing to "+N more". Defaults to 3. */
  maxPerDay?: number;
  /** Show the "Today" action in the head. Defaults to true. */
  showToday?: boolean;
}

const h = React.createElement;

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* Coerce a Date | ISO string | null/undefined into a Date (or null). */
function toDate(v: any) {
  if (v == null || v === "") return null;
  if (v instanceof Date) return Number.isNaN(v.getTime()) ? null : v;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(v));
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}


export function Calendar({
  month,
  value,
  events = [],
  onSelectDate,
  onMonthChange,
  weekStartsOn = 1,
  maxPerDay = 3,
  showToday = true,
  className,
  ...rest
}: CalendarProps) {
  const selected = toDate(value);

  // The shown month — controlled via `month`, else an internal default seeded
  // from the selection or today.
  const controlled = month !== undefined;
  const [internal, setInternal] = React.useState(() => {
    const base = toDate(month) || selected || new Date();
    return { year: base.getFullYear(), month: base.getMonth() };
  });
  const view = controlled
    ? (() => { const d = toDate(month) || new Date(); return { year: d.getFullYear(), month: d.getMonth() }; })()
    : internal;

  // Bucket events by ISO day for O(1) lookup per cell.
  const byDay = React.useMemo(() => {
    const map = new Map();
    for (const ev of events) {
      const d = toDate(ev.date);
      if (!d) continue;
      const key = toISO(d);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(ev);
    }
    return map;
  }, [events]);

  const today = startOfDay(new Date());
  const weeks = buildWeeks(view.year, view.month, weekStartsOn);
  const labels = WEEKDAYS.slice(weekStartsOn).concat(WEEKDAYS.slice(0, weekStartsOn));

  const goToMonth = (year: any, m: any) => {
    const next = new Date(year, m, 1);
    if (!controlled) setInternal({ year: next.getFullYear(), month: next.getMonth() });
    if (onMonthChange) onMonthChange(next);
  };
  const shiftMonth = (delta: any) => goToMonth(view.year, view.month + delta);
  const goToday = () => goToMonth(today.getFullYear(), today.getMonth());

  const pick = (d: any) => { if (onSelectDate) onSelectDate(startOfDay(d), toISO(d)); };

  const iconBtn = (label: any, path: any, onClick: any) =>
    h("button", {
      type: "button",
      className: "ds-button ds-button--icon ds-button--sm",
      "aria-label": label,
      onClick,
    },
      h("svg", { viewBox: "0 0 18 18", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true" },
        h("path", { d: path })
      )
    );

  return h("div", { className: cx("ds-monthview", className), ...rest },
    h("div", { className: "ds-monthview__head" },
      h("div", { className: "ds-monthview__label" }, `${MONTHS[view.month]} ${view.year}`),
      showToday ? h("button", {
        type: "button",
        className: "ds-button ds-button--sm",
        onClick: goToday,
      }, "Today") : null,
      h("div", { className: "ds-monthview__nav" },
        iconBtn("Previous month", "M11 4 6 9l5 5", () => shiftMonth(-1)),
        iconBtn("Next month", "M7 4l5 5-5 5", () => shiftMonth(1))
      )
    ),
    h("div", { className: "ds-monthview__weekdays" },
      labels.map((w) => h("div", { key: `wd-${w}`, className: "ds-monthview__weekday" }, w))
    ),
    h(MonthGrid, {
      weeks,
      gridClassName: "ds-monthview__grid",
      rowClassName: "ds-monthview__row",
      "aria-label": `${MONTHS[view.month]} ${view.year}`,
      cellClassName: (cell: Date) => cx(
        "ds-monthview__day",
        cell.getMonth() !== view.month && "is-outside",
        sameDay(cell, today) && "is-today",
        sameDay(cell, selected) && "is-selected"
      ),
      cellLabel: (cell: Date) => toISO(cell),
      isSelected: (cell: Date) => sameDay(cell, selected),
      onPick: pick,
      // Arrowing off the painted range walks the view with it.
      onNavigateTo: (cell: Date) => goToMonth(cell.getFullYear(), cell.getMonth()),
      renderCell: (cell: Date) => {
        const dayEvents = byDay.get(toISO(cell)) || [];
        const shown = dayEvents.slice(0, maxPerDay);
        const overflow = dayEvents.length - shown.length;
        return [
          h("span", { key: "date", className: "ds-monthview__date" }, cell.getDate()),
          dayEvents.length
            ? h("div", { key: "events", className: "ds-monthview__events" },
                shown.map((ev: any, i: any) => h("span", {
                  key: i,
                  className: cx("ds-monthview__event", ev.status && `is-${ev.status}`),
                  title: ev.label,
                }, ev.label)),
                overflow > 0 ? h("span", { className: "ds-monthview__more" }, `+${overflow} more`) : null
              )
            : null,
        ];
      },
    })
  );
}