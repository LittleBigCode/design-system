import type { HTMLAttributes } from "react";

export type DateLike = Date | string;

export interface DatePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled selected date — a Date or an ISO `yyyy-mm-dd` string. */
  value?: DateLike | null;
  /** Uncontrolled initial date — a Date or an ISO `yyyy-mm-dd` string. */
  defaultValue?: DateLike | null;
  /** Fires on selection with the picked Date and its ISO `yyyy-mm-dd` string. */
  onChange?: (date: Date, iso: string) => void;
  /** Earliest selectable date (inclusive). Earlier days are disabled. */
  min?: DateLike | null;
  /** Latest selectable date (inclusive). Later days are disabled. */
  max?: DateLike | null;
  /** Formats the selected date for the input. Defaults to ISO `yyyy-mm-dd`. */
  format?: (date: Date) => string;
  /** Placeholder for the empty input. Defaults to `yyyy-mm-dd`. */
  placeholder?: string;
  /** Disable the control. */
  disabled?: boolean;
  /** Name forwarded to the underlying input. */
  name?: string;
}

export declare function DatePicker(props: DatePickerProps): JSX.Element;
