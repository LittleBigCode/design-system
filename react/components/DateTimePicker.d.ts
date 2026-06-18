import type { HTMLAttributes } from "react";

export interface DateTimePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled value — an ISO datetime string `"YYYY-MM-DDTHH:MM"`. */
  value?: string;
  /** Uncontrolled initial value — an ISO datetime string `"YYYY-MM-DDTHH:MM"`. */
  defaultValue?: string;
  /** Fires with the combined `"YYYY-MM-DDTHH:MM"` string (empty until the date is set). */
  onChange?: (value: string) => void;
  /** Earliest selectable date (its date part bounds the calendar). */
  min?: string;
  /** Latest selectable date (its date part bounds the calendar). */
  max?: string;
  /** Minute increment forwarded to the time picker. Defaults to 5. */
  step?: number;
  /** Disable both controls. */
  disabled?: boolean;
}

export declare function DateTimePicker(props: DateTimePickerProps): JSX.Element;
