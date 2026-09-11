/* ----------------------------------------------------------------------------
   Month grid — the day-grid skeleton Calendar, DatePicker and DateRangePicker
   all render, and the keyboard model all three owe.

   Internal: not re-exported from react/index.tsx. The three components differ
   in what a cell *contains* (event chips, a bare date, a range span) and in
   nothing else, so the shared part is the structure and the navigation, and the
   cell body stays with the caller.

   Two ARIA rules are enforced here rather than trusted to each caller, because
   both were violated independently in two of the three:

     - a gridcell's state is `aria-selected`. `aria-pressed` is a button-only
       attribute and is invalid on `role="gridcell"`.
     - `role="grid"` must contain `role="row"`, which contains the gridcells.
       A grid whose cells are direct children is not a grid.

   The keyboard model is the WAI-ARIA grid pattern: one tab stop for the whole
   month, arrows to move within it, and a month shift when a move leaves the
   painted range.
   ---------------------------------------------------------------------------- */
import React from "react";

import type { ReactNode } from "react";

import { cx } from "./cx.js";

const h = React.createElement;

const pad = (n: number) => String(n).padStart(2, "0");

/** yyyy-mm-dd for a Date — local, never UTC, so it cannot slip a day near midnight. */
export function toISO(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const sameDay = (a: Date | null, b: Date | null) =>
  !!a && !!b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const addDays = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

const addMonths = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth() + n, d.getDate());

/* The 42 cells (6 weeks) covering `month`, with leading/trailing neighbour days.
   `weekStartsOn` (0=Sun … 6=Sat) rotates the leading offset. */
export function buildWeeks(year: number, month: number, weekStartsOn = 0) {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() - weekStartsOn + 7) % 7;
  const start = new Date(year, month, 1 - lead);
  const weeks: Date[][] = [];
  for (let w = 0; w < 6; w++) {
    const row: Date[] = [];
    for (let d = 0; d < 7; d++) row.push(addDays(start, w * 7 + d));
    weeks.push(row);
  }
  return weeks;
}

export interface MonthGridProps {
  /** The 6×7 day matrix, from {@link buildWeeks}. */
  weeks: Date[][];
  /** Class on the grid container — the caller's `*__grid`. */
  gridClassName: string;
  /** Class on each row. Must resolve to `display: contents` to keep the layout. */
  rowClassName: string;
  /** Class on each day cell. */
  cellClassName: (cell: Date) => string;
  /** Accessible name for a day, e.g. its formatted date. */
  cellLabel: (cell: Date) => string;
  /** Whether the day reads as chosen. Drives `aria-selected` and the tab stop. */
  isSelected: (cell: Date) => boolean;
  /** Whether the day is unselectable. Disabled days are skipped by the arrows. */
  isDisabled?: (cell: Date) => boolean;
  /** Body of the day cell. */
  renderCell: (cell: Date) => ReactNode;
  /** Fires when a day is chosen by click, Enter or Space. */
  onPick: (cell: Date) => void;
  /**
   * Fires when navigation leaves the painted range and the caller has to bring
   * `cell`'s month into view. Focus lands on `cell` once it renders; a caller
   * that declines the change simply keeps focus where it was.
   */
  onNavigateTo?: (cell: Date) => void;
  /** Extra props merged onto each day cell (e.g. a range preview's onMouseEnter). */
  extraCellProps?: (cell: Date) => Record<string, any>;
  /** Rendered as the first row — the weekday column headers. */
  header?: ReactNode;
  "aria-label"?: string;
}

export function MonthGrid({
  weeks,
  gridClassName,
  rowClassName,
  cellClassName,
  cellLabel,
  isSelected,
  isDisabled,
  renderCell,
  onPick,
  onNavigateTo,
  extraCellProps,
  header,
  "aria-label": ariaLabel,
}: MonthGridProps) {
  const cells = React.useMemo(() => weeks.flat(), [weeks]);
  const refs = React.useRef(new Map<string, HTMLButtonElement | null>());
  /* ISO of the day holding the tab stop. Follows focus, so tabbing out of the
     month and back returns to the day the reader left rather than to the 1st. */
  const [cursor, setCursor] = React.useState<string | null>(null);

  const enabled = (cell: Date) => !isDisabled || !isDisabled(cell);

  /* Exactly one day is tabbable. Preference order: where focus last was, then
     the selection, then the first day that can be chosen — so Tab never lands
     on a dead cell, and never on all 42. */
  const tabStop =
    (cursor && cells.some((c) => toISO(c) === cursor && enabled(c)) && cursor) ||
    toISO(cells.find((c) => isSelected(c) && enabled(c)) ?? cells.find(enabled) ?? cells[0]);

  /* A move past the edge of the painted range asks the caller to shift months,
     and the target day does not exist in the DOM until that render commits —
     so the focus is deferred to the layout effect after it. */
  const pending = React.useRef<string | null>(null);
  React.useLayoutEffect(() => {
    if (!pending.current) return;
    refs.current.get(pending.current)?.focus();
    pending.current = null;
  });

  const goTo = (target: Date) => {
    const iso = toISO(target);
    setCursor(iso);
    const el = refs.current.get(iso);
    if (el) el.focus();
    else {
      pending.current = iso;
      if (onNavigateTo) onNavigateTo(target);
    }
  };

  const onKeyDown = (e: any, cell: Date) => {
    let target: Date;
    switch (e.key) {
      case "ArrowLeft": target = addDays(cell, -1); break;
      case "ArrowRight": target = addDays(cell, 1); break;
      case "ArrowUp": target = addDays(cell, -7); break;
      case "ArrowDown": target = addDays(cell, 7); break;
      /* Home/End are the ends of the week, per the grid pattern — the month's
         ends are PageUp/PageDown's job. */
      case "Home": target = addDays(cell, -cells.findIndex((c) => sameDay(c, cell)) % 7); break;
      case "End": target = addDays(cell, 6 - (cells.findIndex((c) => sameDay(c, cell)) % 7)); break;
      case "PageUp": target = addMonths(cell, e.shiftKey ? -12 : -1); break;
      case "PageDown": target = addMonths(cell, e.shiftKey ? 12 : 1); break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (enabled(cell)) onPick(cell);
        return;
      default:
        return;
    }
    e.preventDefault();
    goTo(target);
  };

  const row = (key: string, children: ReactNode) =>
    h("div", { key, className: rowClassName, role: "row" }, children);

  return h("div",
    { className: gridClassName, role: "grid", "aria-label": ariaLabel },
    header != null ? row("head", header) : null,
    weeks.map((week, wi) =>
      row(`r-${wi}`, week.map((cell, ci) => {
        const iso = toISO(cell);
        const dis = !enabled(cell);
        return h("button", {
          key: `d-${wi}-${ci}`,
          ref: (el: HTMLButtonElement | null): void => { refs.current.set(iso, el); },
          type: "button",
          role: "gridcell",
          className: cx(cellClassName(cell)),
          disabled: dis || undefined,
          /* Never aria-pressed: invalid on a gridcell, and the reason two of
             the three callers failed the axe gate. */
          "aria-selected": isSelected(cell),
          "aria-label": cellLabel(cell),
          tabIndex: iso === tabStop ? 0 : -1,
          onFocus: () => setCursor(iso),
          onClick: () => { if (!dis) onPick(cell); },
          onKeyDown: (e: any) => onKeyDown(e, cell),
          ...(extraCellProps ? extraCellProps(cell) : null),
        }, renderCell(cell));
      }))
    )
  );
}
