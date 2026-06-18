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

const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const pad = (n) => String(n).padStart(2, "0");

/* yyyy-mm-dd for a Date (local — never UTC, to avoid an off-by-one near midnight). */
function toISO(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/* Coerce a Date | ISO string | null/undefined into a Date (or null). */
function toDate(v) {
  if (v == null || v === "") return null;
  if (v instanceof Date) return Number.isNaN(v.getTime()) ? null : v;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(v));
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const sameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/* The 42 cells (6 weeks) covering `month`, with leading/trailing neighbour days.
   `weekStartsOn` (0=Sun … 6=Sat) rotates the leading offset and the labels. */
function buildWeeks(year, month, weekStartsOn) {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() - weekStartsOn + 7) % 7;
  const start = new Date(year, month, 1 - lead);
  const weeks = [];
  for (let w = 0; w < 6; w++) {
    const row = [];
    for (let d = 0; d < 7; d++) {
      row.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + (w * 7 + d)));
    }
    weeks.push(row);
  }
  return weeks;
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
}) {
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

  const goToMonth = (year, m) => {
    const next = new Date(year, m, 1);
    if (!controlled) setInternal({ year: next.getFullYear(), month: next.getMonth() });
    if (onMonthChange) onMonthChange(next);
  };
  const shiftMonth = (delta) => goToMonth(view.year, view.month + delta);
  const goToday = () => goToMonth(today.getFullYear(), today.getMonth());

  const pick = (d) => { if (onSelectDate) onSelectDate(startOfDay(d), toISO(d)); };

  const iconBtn = (label, path, onClick) =>
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
    h("div", { className: "ds-monthview__grid", role: "grid" },
      weeks.map((row, wi) =>
        // A role="row" wrapper per week so the grid has valid row > gridcell
        // structure. display:contents (see calendar-view.css) keeps the day
        // buttons as direct items of the 7-column grid.
        h("div", { key: `r-${wi}`, className: "ds-monthview__row", role: "row" },
        row.map((cell, ci) => {
          const outside = cell.getMonth() !== view.month;
          const isSel = sameDay(cell, selected);
          const isToday = sameDay(cell, today);
          const dayEvents = byDay.get(toISO(cell)) || [];
          const shown = dayEvents.slice(0, maxPerDay);
          const overflow = dayEvents.length - shown.length;
          return h("button", {
            key: `d-${wi}-${ci}`,
            type: "button",
            role: "gridcell",
            "aria-label": toISO(cell),
            // aria-selected is allowed on gridcell (aria-pressed is not).
            "aria-selected": isSel,
            className: cx(
              "ds-monthview__day",
              outside && "is-outside",
              isToday && "is-today",
              isSel && "is-selected"
            ),
            onClick: () => pick(cell),
          },
            h("span", { className: "ds-monthview__date" }, cell.getDate()),
            dayEvents.length
              ? h("div", { className: "ds-monthview__events" },
                  shown.map((ev, i) => h("span", {
                    key: i,
                    className: cx("ds-monthview__event", ev.status && `is-${ev.status}`),
                    title: ev.label,
                  }, ev.label)),
                  overflow > 0 ? h("span", { className: "ds-monthview__more" }, `+${overflow} more`) : null
                )
              : null
          );
        })
        )
      )
    )
  );
}
