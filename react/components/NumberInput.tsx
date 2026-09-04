"use client"

import { cx } from "../lib/cx.js";
import React from "react";

import type {
  HTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface NumberInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled value (null when the field is cleared). */
  value?: number | null;
  /** Uncontrolled initial value. */
  defaultValue?: number | null;
  /** Called with the next value (null when cleared) on step or edit. */
  onChange?: (value: number | null) => void;
  /** Lower bound — clamps and disables the minus button. */
  min?: number;
  /** Upper bound — clamps and disables the plus button. */
  max?: number;
  /** Increment applied by the ± buttons. Default 1. */
  step?: number;
  disabled?: boolean;
}
const h = React.createElement;

/* ---- Number input -------------------------------------------------------
   A numeric field flanked by −/+ stepper buttons (.ds-number-input). The
   buttons increment / decrement by `step`, clamped to `min`/`max`, and disable
   themselves at the bounds. Controlled (`value`) or uncontrolled
   (`defaultValue`); the value is a number (or null when the field is cleared).
   Styling: css/components/number-input.css. */
const clamp = (n: any, min: any, max: any) => {
  let v = n;
  if (min != null && v < min) v = min;
  if (max != null && v > max) v = max;
  return v;
};

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  { value, defaultValue, onChange, min, max, step = 1, disabled, className, id, ...rest },
  ref
) {
  const controlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? null);
  const current = controlled ? value : internal;

  const set = (next: any) => {
    if (!controlled) setInternal(next);
    onChange && onChange(next);
  };

  // Base for stepping when the field is empty: clamp 0 into range.
  const base = current == null ? clamp(0, min, max) : current;

  const stepBy = (dir: any) => {
    if (disabled) return;
    set(clamp(base + dir * step, min, max));
  };

  const onInput = (e: any) => {
    const raw = e.target.value;
    if (raw === "" || raw === "-") { set(null); return; }
    const n = Number(raw);
    if (Number.isNaN(n)) return;
    set(n);
  };

  // Clamp on blur so out-of-range typed values settle to the bounds.
  const onBlur = () => {
    if (current == null) return;
    const clamped = clamp(current, min, max);
    if (clamped !== current) set(clamped);
  };

  const atMin = min != null && current != null && current <= min;
  const atMax = max != null && current != null && current >= max;

  return h("div", {
      className: cx("ds-number-input", className),
      ...rest,
    },
    h("button", {
      className: "ds-number-input__step",
      type: "button",
      "aria-label": "Decrement",
      disabled: disabled || atMin || undefined,
      tabIndex: -1,
      onClick: () => stepBy(-1),
    }, "−"),
    h("input", {
      ref,
      id,
      className: "ds-number-input__field",
      type: "number",
      inputMode: "decimal",
      role: "spinbutton",
      "aria-valuenow": current ?? undefined,
      "aria-valuemin": min,
      "aria-valuemax": max,
      min,
      max,
      step,
      disabled,
      value: current == null ? "" : current,
      onChange: onInput,
      onBlur,
    }),
    h("button", {
      className: "ds-number-input__step",
      type: "button",
      "aria-label": "Increment",
      disabled: disabled || atMax || undefined,
      tabIndex: -1,
      onClick: () => stepBy(1),
    }, "+")
  );
});