/* ----------------------------------------------------------------------------
   Agenda — a chronological list of events grouped by day.
   Sorts the given events by date (then time), groups them under per-day headers
   (uppercase faint weekday + date), and renders each as a row: a tabular faint
   time column, a small square status marker, and a body with a title + optional
   meta line. Falls back to an empty state when there are no events. All date math
   is plain JS — no libraries. Event `date` accepts a Date or an ISO `yyyy-mm-dd`
   string. Styling: css/components/agenda.css.
   ---------------------------------------------------------------------------- */
import React from "react";

const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const pad = (n) => String(n).padStart(2, "0");

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

export function Agenda({
  events = [],
  emptyMessage = "No events scheduled.",
  className,
  ...rest
}) {
  // Resolve dates, drop unparseable rows, then sort by day + time.
  const groups = React.useMemo(() => {
    const rows = events
      .map((ev) => ({ ev, date: toDate(ev.date) }))
      .filter((r) => r.date);
    rows.sort((a, b) => {
      const dd = a.date - b.date;
      if (dd !== 0) return dd;
      return String(a.ev.time || "").localeCompare(String(b.ev.time || ""));
    });
    // Bucket consecutive rows by ISO day, preserving order.
    const out = [];
    let cur = null;
    for (const r of rows) {
      const key = toISO(r.date);
      if (!cur || cur.key !== key) {
        cur = { key, date: r.date, items: [] };
        out.push(cur);
      }
      cur.items.push(r.ev);
    }
    return out;
  }, [events]);

  if (!groups.length) {
    return h("div", { className: cx("ds-agenda", className), ...rest },
      h("div", { className: "ds-agenda__empty" }, emptyMessage)
    );
  }

  return h("div", { className: cx("ds-agenda", className), ...rest },
    groups.map((g) => h(React.Fragment, { key: g.key },
      h("div", { className: "ds-agenda__day" },
        h("span", { className: "ds-agenda__weekday" }, WEEKDAYS[g.date.getDay()]),
        h("span", { className: "ds-agenda__date" }, `${MONTHS[g.date.getMonth()]} ${g.date.getDate()}, ${g.date.getFullYear()}`)
      ),
      g.items.map((ev, i) => h("div", { key: i, className: "ds-agenda__event" },
        h("div", { className: "ds-agenda__time" }, ev.time != null ? ev.time : ""),
        h("span", { className: cx("ds-agenda__marker", ev.status && `is-${ev.status}`) }),
        h("div", { className: "ds-agenda__body" },
          h("div", { className: "ds-agenda__title" }, ev.title),
          ev.meta != null ? h("div", { className: "ds-agenda__meta" }, ev.meta) : null
        )
      ))
    ))
  );
}
