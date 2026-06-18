/* ----------------------------------------------------------------------------
   Date picker — a .ds-input that opens a .ds-calendar popover.
   Renders a month grid (with leading / trailing days from the neighbouring
   months), navigates months with prev / next icon buttons, and picks a day.
   Closes on select, outside-click and Escape. Works controlled (value/onChange)
   or uncontrolled (defaultValue). All date math is plain JS — no libraries.
   `value` is a Date or an ISO yyyy-mm-dd string; the input shows `format(date)`
   (ISO yyyy-mm-dd by default). Styling: css/components/date-picker.css.
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

export function DatePicker({
  value,
  defaultValue,
  onChange,
  min,
  max,
  format,
  placeholder = "yyyy-mm-dd",
  disabled,
  name,
  className,
  ...rest
}) {
  const controlled = value !== undefined;
  const [internal, setInternal] = React.useState(() => toDate(defaultValue));
  const selected = controlled ? toDate(value) : internal;

  const fmt = format || toISO;
  const minDate = React.useMemo(() => { const d = toDate(min); return d ? startOfDay(d) : null; }, [min]);
  const maxDate = React.useMemo(() => { const d = toDate(max); return d ? startOfDay(d) : null; }, [max]);

  const [open, setOpen] = React.useState(false);
  // The month currently shown in the grid — seeded from the selection or today.
  const [view, setView] = React.useState(() => {
    const base = selected || new Date();
    return { year: base.getFullYear(), month: base.getMonth() };
  });

  const rootRef = React.useRef(null);
  const inputRef = React.useRef(null);

  // When opening, snap the view to the selected month (or today).
  React.useEffect(() => {
    if (!open) return;
    const base = selected || new Date();
    setView({ year: base.getFullYear(), month: base.getMonth() });
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
  const weeks = buildWeeks(view.year, view.month);

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

  const pick = (d) => {
    if (isDisabledDay(d)) return;
    const day = startOfDay(d);
    if (!controlled) setInternal(day);
    if (onChange) onChange(day, toISO(day));
    setOpen(false);
    if (inputRef.current && inputRef.current.focus) inputRef.current.focus();
  };

  const display = selected ? fmt(selected) : "";

  return h("div", {
    ref: rootRef,
    className: cx("ds-datepicker", className),
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
          className: "ds-calendar",
          role: "dialog",
          "aria-label": "Choose date",
          style: { position: "absolute", top: "calc(100% + 6px)", left: 0 },
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
            h("div", { className: "ds-calendar__label" }, `${MONTHS[view.month]} ${view.year}`),
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
          h("div", { className: "ds-calendar__grid", role: "grid" },
            WEEKDAYS.map((w) =>
              h("div", { key: `wd-${w}`, className: "ds-calendar__weekday", role: "columnheader", "aria-hidden": "true" }, w)
            ),
            weeks.map((row, wi) =>
              row.map((cell, ci) => {
                const outside = cell.getMonth() !== view.month;
                const dis = isDisabledDay(cell);
                const isSel = sameDay(cell, selected);
                return h("button", {
                  key: `d-${wi}-${ci}`,
                  type: "button",
                  className: cx(
                    "ds-calendar__day",
                    outside && "is-outside",
                    sameDay(cell, today) && "is-today",
                    isSel && "is-selected"
                  ),
                  role: "gridcell",
                  disabled: dis || undefined,
                  "aria-pressed": isSel,
                  "aria-label": fmt(cell),
                  tabIndex: dis ? -1 : 0,
                  onClick: () => pick(cell),
                }, cell.getDate());
              })
            )
          )
        )
      : null
  );
}
