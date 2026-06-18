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

export declare function Calendar(props: CalendarProps): JSX.Element;
