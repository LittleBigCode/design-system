"use client"

import { cx } from "../lib/cx.js";
import { MonthGrid, buildWeeks, sameDay, startOfDay, toISO } from "../lib/monthGrid.js";
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

import type { HTMLAttributes } from "react";

export type DateLike = Date | string;

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangeValue {
  /** Range start — a Date or an ISO `yyyy-mm-dd` string. */
  start?: DateLike | null;
  /** Range end — a Date or an ISO `yyyy-mm-dd` string. */
  end?: DateLike | null;
}

export interface DateRangePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled selected range — `{ start, end }`, each a Date or ISO string. */
  value?: DateRangeValue | null;
  /** Uncontrolled initial range — `{ start, end }`, each a Date or ISO string. */
  defaultValue?: DateRangeValue | null;
  /** Fires when the range changes, with normalized Dates and their ISO strings. */
  onChange?: (
    range: DateRange,
    iso: { start: string | null; end: string | null }
  ) => void;
  /** Earliest selectable date (inclusive). Earlier days are disabled. */
  min?: DateLike | null;
  /** Latest selectable date (inclusive). Later days are disabled. */
  max?: DateLike | null;
  /** Formats each endpoint for the input. Defaults to ISO `yyyy-mm-dd`. */
  format?: (date: Date) => string;
  /** Placeholder for the empty input. */
  placeholder?: string;
  /** Disable the control. */
  disabled?: boolean;
  /** Name forwarded to the underlying input. */
  name?: string;
}

const h = React.createElement;

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* Coerce a Date | ISO string | null/undefined into a Date (or null). */
function toDate(v: any) {
  if (v == null || v === "") return null;
  if (v instanceof Date) return Number.isNaN(v.getTime()) ? null : v;
  // Parse yyyy-mm-dd as a local date (so it lands on the intended calendar day).
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(v));
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

/* Coerce a { start, end } range (Date | ISO each) into normalized Dates (or null). */
function toRange(v: any) {
  if (!v) return { start: null, end: null };
  return { start: toDate(v.start), end: toDate(v.end) };
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
}: DateRangePickerProps) {
  const controlled = value !== undefined;
  const [internal, setInternal] = React.useState(() => toRange(defaultValue));
  const range = controlled ? toRange(value) : internal;

  const fmt = format || toISO;
  const minDate = React.useMemo(() => { const d = toDate(min); return d ? startOfDay(d) : null; }, [min]);
  const maxDate = React.useMemo(() => { const d = toDate(max); return d ? startOfDay(d) : null; }, [max]);

  const [open, setOpen] = React.useState(false);
  const popupId = React.useId();
  // The left month shown in the grid; the right is always the following month.
  const [view, setView] = React.useState(() => {
    const base = range.start || new Date();
    return { year: base.getFullYear(), month: base.getMonth() };
  });
  // Hovered day while picking the end of the range (for the live preview).
  const [hovered, setHovered] = React.useState<any>(null);

  const rootRef = React.useRef<any>(null);
  const inputRef = React.useRef<any>(null);

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
    const onDocClick = (e: any) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e: any) => {
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

  const isDisabledDay = (d: any) => {
    const day = startOfDay(d);
    if (minDate && day < minDate) return true;
    if (maxDate && day > maxDate) return true;
    return false;
  };

  const shiftMonth = (delta: any) => {
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  const setRange = (next: any) => {
    if (!controlled) setInternal(next);
    if (onChange) {
      onChange(next, {
        start: next.start ? toISO(next.start) : null,
        end: next.end ? toISO(next.end) : null,
      });
    }
  };

  const pick = (d: any) => {
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

  const inSpan = (d: any) => {
    if (!range.start || !previewEnd) return false;
    const day = startOfDay(d).getTime();
    const lo = Math.min(range.start.getTime(), previewEnd.getTime());
    const hi = Math.max(range.start.getTime(), previewEnd.getTime());
    return day > lo && day < hi;
  };
  const isStart = (d: any) => {
    if (!range.start) return false;
    const ends = [range.start, previewEnd]
      .filter((x): x is Date => x instanceof Date)
      .map((x) => x.getTime());
    return sameDay(d, new Date(Math.min(...ends)));
  };
  const isEnd = (d: any) => {
    if (!range.start || !previewEnd) return false;
    const ends = [range.start, previewEnd].map((x) => x.getTime());
    return sameDay(d, new Date(Math.max(...ends)));
  };

  /* `paneOffset` is which of the two side-by-side months this is (0 = left),
     so navigating off a pane's painted range moves the *pair* and keeps the
     target in the pane the reader was already in. */
  const renderMonth = (year: any, month: any, paneOffset: number) =>
    h("div", { className: "ds-calendar", "aria-label": `${MONTHS[month]} ${year}` },
      h("div", { className: "ds-calendar__head" },
        h("div", { className: "ds-calendar__label" }, `${MONTHS[month]} ${year}`)
      ),
      h(MonthGrid, {
        weeks: buildWeeks(year, month),
        gridClassName: "ds-calendar__grid",
        rowClassName: "ds-calendar__row",
        "aria-label": `${MONTHS[month]} ${year}`,
        header: WEEKDAYS.map((w) =>
          h("div", { key: `wd-${year}-${month}-${w}`, className: "ds-calendar__weekday", role: "columnheader", "aria-hidden": "true" }, w)
        ),
        cellClassName: (cell: Date) => {
          const start = isStart(cell);
          const end = isEnd(cell);
          return cx(
            "ds-calendar__day",
            cell.getMonth() !== month && "is-outside",
            sameDay(cell, today) && "is-today",
            start && "is-range-start",
            end && "is-range-end",
            !start && !end && inSpan(cell) && "is-in-range"
          );
        },
        cellLabel: (cell: Date) => fmt(cell),
        isSelected: (cell: Date) => isStart(cell) || isEnd(cell),
        isDisabled: isDisabledDay,
        onPick: pick,
        onNavigateTo: (cell: Date) => {
          // Round-tripped through Date so a month of -1 or 12 normalises into
          // the neighbouring year rather than indexing MONTHS out of range.
          const d = new Date(cell.getFullYear(), cell.getMonth() - paneOffset, 1);
          setView({ year: d.getFullYear(), month: d.getMonth() });
        },
        extraCellProps: (cell: Date) => ({
          onMouseEnter: () => { if (!isDisabledDay(cell)) setHovered(cell); },
        }),
        renderCell: (cell: Date) => cell.getDate(),
      })
    );

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
      /* role=combobox, not the bare textbox this readOnly input would default
         to: aria-expanded is not an allowed attribute on a textbox, which is
         the invalid-ARIA violation the axe gate reports on this trigger. A
         readOnly input that opens a chooser is exactly what combobox names. */
      role: "combobox",
      "aria-haspopup": "dialog",
      "aria-expanded": open,
      "aria-controls": popupId,
      autoComplete: "off",
      onClick: () => { if (!disabled) setOpen((o) => !o); },
      onKeyDown: (e: any) => {
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
          id: popupId,
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
            renderMonth(view.year, view.month, 0),
            renderMonth(next.getFullYear(), next.getMonth(), 1)
          )
        )
      : null
  );
}