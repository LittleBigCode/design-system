import { cx } from "../lib/cx.js";
import React from "react";

import type {
  InputHTMLAttributes,
  ChangeEvent,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface RangeProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
  /** Controlled value. */
  value?: number | string;
  /** Initial value (uncontrolled). */
  defaultValue?: number | string;
  onChange?: (value: number, event: ChangeEvent<HTMLInputElement>) => void;
  min?: number | string;
  max?: number | string;
  step?: number | string;
}
const h = React.createElement;

/* ---- Range (controlled or uncontrolled) ---------------------------------
   A flat <input type=range> with a square thumb (.ds-range). Forwards a ref to
   the input. Pass `value` for controlled or `defaultValue` for uncontrolled;
   onChange receives (numberValue, event). min/max/step and other props spread
   onto the input. */
export const Range = React.forwardRef<HTMLInputElement, RangeProps>(function Range(
  { value, defaultValue, onChange, min, max, step, className, ...rest }, ref
) {
  const props: Record<string, any> = {
    ref, type: "range", min, max, step,
    className: cx("ds-range", className),
    onChange: (e: any) => onChange && onChange(e.target.valueAsNumber, e),
    ...rest,
  };
  if (value !== undefined) props.value = value;
  else if (defaultValue !== undefined) props.defaultValue = defaultValue;
  return h("input", props);
});
