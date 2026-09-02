import { cx } from "../lib/cx.js";
import React from "react";

import type {
  SelectHTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
  ReactNode,
} from "react";

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Render these options instead of (or in place of) children. */
  options?: SelectOption[];
  /** Full-width select. */
  block?: boolean;
}
const h = React.createElement;

/* ---- Select -------------------------------------------------------------
   A native <select> wrapped in .ds-select so the CSS can draw the custom
   chevron and the flat .ds-input look. Forwards a ref to the <select>. Provide
   `options` ([{ value, label, disabled? }]) or pass <option> children. `block`
   makes it full-width. value/defaultValue + onChange behave like a native
   select; extra props (name, required, ...) spread onto the <select>. */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { value, defaultValue, onChange, options, block, className, children, ...rest }, ref
) {
  const props: Record<string, any> = { ref, onChange, ...rest };
  if (value !== undefined) props.value = value;
  else if (defaultValue !== undefined) props.defaultValue = defaultValue;
  const body = options
    ? options.map((o) => {
        const opt = o && typeof o === "object" ? o : { value: o, label: o };
        return h("option", { key: opt.value, value: opt.value, disabled: opt.disabled }, opt.label ?? opt.value);
      })
    : children;
  return h("div", { className: cx("ds-select", block && "ds-select--block", className) },
    h("select", props, body)
  );
});
