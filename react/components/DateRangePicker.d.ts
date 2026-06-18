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

export declare function DateRangePicker(props: DateRangePickerProps): JSX.Element;
