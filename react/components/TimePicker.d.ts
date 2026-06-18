import type { HTMLAttributes } from "react";

export interface TimePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled time as an `"HH:MM"` string. */
  value?: string;
  /** Uncontrolled initial time as an `"HH:MM"` string. */
  defaultValue?: string;
  /** Fires with the chosen `"HH:MM"` string (empty string when cleared). */
  onChange?: (value: string) => void;
  /** Minute increment for the minutes column. Defaults to 5. */
  step?: number;
  /** Placeholder for the empty field. Defaults to `hh:mm`. */
  placeholder?: string;
  /** Disable the control. */
  disabled?: boolean;
  /** Name forwarded to the underlying input. */
  name?: string;
}

export declare function TimePicker(props: TimePickerProps): JSX.Element;
