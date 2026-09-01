import { cx } from "../lib/cx.js";
/* ----------------------------------------------------------------------------
   Date-time picker — composes a DatePicker and a TimePicker side by side.
   The date side picks the calendar day; the time side picks HH:MM. The two are
   combined into a single ISO datetime string "YYYY-MM-DDTHH:MM" and passed to
   onChange (empty string until both halves are set). Works controlled
   (value/onChange) or uncontrolled (defaultValue). `min` / `max` apply to the
   date half (their date part is forwarded to the DatePicker); `step` drives the
   TimePicker minutes column. Styling: css/components/date-time.css.
   ---------------------------------------------------------------------------- */
import React from "react";
import { DatePicker } from "./DatePicker.js";
import { TimePicker } from "./TimePicker.js";

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

const h = React.createElement;

/* Split a "YYYY-MM-DDTHH:MM" (T or space separator) into its date / time parts. */
function split(v: any) {
  if (v == null || v === "") return { date: "", time: "" };
  const s = String(v);
  const m = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  if (!m) return { date: "", time: "" };
  return { date: m[1], time: m[2] || "" };
}

/* The date half of a min/max bound (drop any time part). */
const datePart = (v: any) => split(v).date || undefined;

const combine = (date: any, time: any) => (date ? `${date}T${time || "00:00"}` : "");

export function DateTimePicker({
  value,
  defaultValue,
  onChange,
  min,
  max,
  step,
  disabled,
  className,
  ...rest
}: DateTimePickerProps) {
  const controlled = value !== undefined;
  const [internal, setInternal] = React.useState(() => split(defaultValue));
  const parts = controlled ? split(value) : internal;

  function emit(next: any) {
    if (!controlled) setInternal(next);
    onChange && onChange(combine(next.date, next.time));
  }

  function onDate(_date: any, iso: any) {
    emit({ date: iso, time: parts.time });
  }
  function onTime(time: any) {
    emit({ date: parts.date, time });
  }

  return h("div", {
    className: cx("ds-datetime", className),
    ...rest,
  },
    h(DatePicker, {
      value: parts.date,
      onChange: onDate,
      min: datePart(min),
      max: datePart(max),
      disabled,
    }),
    h(TimePicker, {
      value: parts.time,
      onChange: onTime,
      step,
      disabled,
    })
  );
}
