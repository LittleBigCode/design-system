/* ----------------------------------------------------------------------------
   Date range picker — a .ds-input that opens a two-month .ds-daterange popover.
   Renders two side-by-side .ds-calendar month grids and selects a start+end
   range: the first click sets the start, the next sets the end (swapping if it
   falls before the start), and a third click starts a fresh range. Hovering
   previews the in-progress range. Closes on outside-click and Escape. Works
   controlled (value/onChange) or uncontrolled (defaultValue). All date math is
   plain JS — no libraries. `value` is { start, end } where each is a Date or an
   ISO yyyy-mm-dd string. Styling: css/components/date-range.css (reuses the
   .ds-calendar* look from css/components/date-picker.css).
   ---------------------------------------------------------------------------- */
import React from "react";

const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
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
  // Parse yyyy-mm-dd as a local date (so it lands on the intended calendar day).
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(v));
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const sameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/* Coerce a { start, end } range (Date | ISO each) into normalized Dates (or null). */
function toRange(v) {
  if (!v) return { start: null, end: null };
  return { start: toDate(v.start), end: toDate(v.end) };
}

/* The 42 cells (6 weeks) covering `month`, with leading/trailing neighbour days. */
function buildWeeks(year, month) {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay()); // back up to the Sunday
  const weeks = [];
  for (let w = 0; w < 6; w++) {
    const row = [];
    for (let d = 0; d < 7; d++) {
      const cell = new Date(start.getFullYear(), start.getMonth(), start.getDate() + (w * 7 + d));
      row.push(cell);
    }
    weeks.push(row);
  }
  return weeks;
}

export function DateRangePicker({
  value,
  defaultValue,
  onChange,
  min,
  max,
  format,
  placeholder = "yyyy-mm-dd — yyyy-mm-dd",
  disabled,
  name,
  className,
  ...rest
}) {
  const controlled = value !== undefined;
  const [internal, setInternal] = React.useState(() => toRange(defaultValue));
  const range = controlled ? toRange(value) : internal;

  const fmt = format || toISO;
  const minDate = React.useMemo(() => { const d = toDate(min); return d ? startOfDay(d) : null; }, [min]);
  const maxDate = React.useMemo(() => { const d = toDate(max); return d ? startOfDay(d) : null; }, [max]);

  const [open, setOpen] = React.useState(false);
  // The left month shown in the grid; the right is always the following month.
  const [view, setView] = React.useState(() => {
    const base = range.start || new Date();
    return { year: base.getFullYear(), month: base.getMonth() };
  });
  // Hovered day while picking the end of the range (for the live preview).
  const [hovered, setHovered] = React.useState(null);

  const rootRef = React.useRef(null);
  const inputRef = React.useRef(null);

  // When opening, snap the view to the range start (or today).
  React.useEffect(() => {
    if (!open) return;
    const base = range.start || new Date();
    setView({ year: base.getFullYear(), month: base.getMonth() });
    setHovered(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Outside-click + Escape close.
  React.useEffect(() => {
    if (!open) return undefined;
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        if (inputRef.current && inputRef.current.focus) inputRef.current.focus();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const today = startOfDay(new Date());

  const isDisabledDay = (d) => {
    const day = startOfDay(d);
    if (minDate && day < minDate) return true;
    if (maxDate && day > maxDate) return true;
    return false;
  };

  const shiftMonth = (delta) => {
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  const setRange = (next) => {
    if (!controlled) setInternal(next);
    if (onChange) {
      onChange(next, {
        start: next.start ? toISO(next.start) : null,
        end: next.end ? toISO(next.end) : null,
      });
    }
  };

  const pick = (d) => {
    if (isDisabledDay(d)) return;
    const day = startOfDay(d);
    // No start yet, or a complete range exists → begin a fresh range.
    if (!range.start || range.end) {
      setRange({ start: day, end: null });
      return;
    }
    // Have a start, picking the end — swap if the end falls before the start.
    if (day < range.start) setRange({ start: day, end: range.start });
    else setRange({ start: range.start, end: day });
  };

  // The effective end while picking: the real end, or the hovered preview.
  const previewEnd =
    range.start && !range.end && hovered ? startOfDay(hovered) : range.end;

  const inSpan = (d) => {
    if (!range.start || !previewEnd) return false;
    const day = startOfDay(d).getTime();
    const lo = Math.min(range.start.getTime(), previewEnd.getTime());
    const hi = Math.max(range.start.getTime(), previewEnd.getTime());
    return day > lo && day < hi;
  };
  const isStart = (d) => {
    if (!range.start) return false;
    const ends = [range.start, previewEnd].filter(Boolean).map((x) => x.getTime());
    return sameDay(d, new Date(Math.min(...ends)));
  };
  const isEnd = (d) => {
    if (!range.start || !previewEnd) return false;
    const ends = [range.start, previewEnd].map((x) => x.getTime());
    return sameDay(d, new Date(Math.max(...ends)));
  };

  const renderMonth = (year, month) => {
    const weeks = buildWeeks(year, month);
    return h("div", { className: "ds-calendar", role: "grid", "aria-label": `${MONTHS[month]} ${year}` },
      h("div", { className: "ds-calendar__head" },
        h("div", { className: "ds-calendar__label" }, `${MONTHS[month]} ${year}`)
      ),
      h("div", { className: "ds-calendar__grid" },
        WEEKDAYS.map((w) =>
          h("div", { key: `wd-${year}-${month}-${w}`, className: "ds-calendar__weekday", role: "columnheader", "aria-hidden": "true" }, w)
        ),
        weeks.map((row, wi) =>
          row.map((cell, ci) => {
            const outside = cell.getMonth() !== month;
            const dis = isDisabledDay(cell);
            const start = isStart(cell);
            const end = isEnd(cell);
            const mid = !start && !end && inSpan(cell);
            return h("button", {
              key: `d-${year}-${month}-${wi}-${ci}`,
              type: "button",
              className: cx(
                "ds-calendar__day",
                outside && "is-outside",
                sameDay(cell, today) && "is-today",
                start && "is-range-start",
                end && "is-range-end",
                mid && "is-in-range"
              ),
              role: "gridcell",
              disabled: dis || undefined,
              "aria-pressed": start || end,
              "aria-label": fmt(cell),
              tabIndex: dis ? -1 : 0,
              onClick: () => pick(cell),
              onMouseEnter: () => { if (!dis) setHovered(cell); },
            }, cell.getDate());
          })
        )
      )
    );
  };

  const display = range.start
    ? range.end
      ? `${fmt(range.start)} — ${fmt(range.end)}`
      : fmt(range.start)
    : "";

  const next = new Date(view.year, view.month + 1, 1);

  return h("div", {
    ref: rootRef,
    className: cx("ds-daterange", className),
    ...rest,
  },
    h("input", {
      ref: inputRef,
      type: "text",
      className: "ds-input",
      value: display,
      placeholder,
      readOnly: true,
      disabled: disabled || undefined,
      name,
      "aria-haspopup": "dialog",
      "aria-expanded": open,
      autoComplete: "off",
      onClick: () => { if (!disabled) setOpen((o) => !o); },
      onKeyDown: (e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          setOpen(true);
        }
      },
    }),
    open
      ? h("div", {
          className: "ds-daterange__popover",
          role: "dialog",
          "aria-label": "Choose date range",
          style: { position: "absolute", top: "calc(100% + 6px)", left: 0 },
          onMouseLeave: () => setHovered(null),
        },
          h("div", { className: "ds-calendar__head" },
            h("button", {
              type: "button",
              className: "ds-button ds-button--icon ds-button--sm",
              "aria-label": "Previous month",
              onClick: () => shiftMonth(-1),
            },
              h("svg", { viewBox: "0 0 18 18", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true" },
                h("path", { d: "M11 4 6 9l5 5" })
              )
            ),
            h("button", {
              type: "button",
              className: "ds-button ds-button--icon ds-button--sm",
              "aria-label": "Next month",
              onClick: () => shiftMonth(1),
            },
              h("svg", { viewBox: "0 0 18 18", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true" },
                h("path", { d: "M7 4l5 5-5 5" })
              )
            )
          ),
          h("div", { className: "ds-daterange__months" },
            renderMonth(view.year, view.month),
            renderMonth(next.getFullYear(), next.getMonth())
          )
        )
      : null
  );
}
