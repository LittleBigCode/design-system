import { cx } from "../lib/cx.js";
import React from "react";

import type { ChangeEvent, ReactNode } from "react";

export interface RadioProps {
  /** Controlled checked state (usually set by RadioGroup). */
  checked?: boolean;
  /** Initial checked state (uncontrolled, standalone use). */
  defaultChecked?: boolean;
  name?: string;
  value?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface RadioOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}
export interface RadioGroupProps {
  /** Controlled selected value. */
  value?: string;
  /** Initial selected value (uncontrolled). */
  defaultValue?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  /** Shared name applied to every radio in the group. */
  name?: string;
  options: RadioOption[];
  className?: string;
}
const h = React.createElement;

/* ---- Radio --------------------------------------------------------------
   A single flat radio built from a real <input type=radio>. Renders the
   .ds-radio markup the CSS styles. Usually driven by a RadioGroup, but can be
   used standalone with `name` + `value` + `checked`. */
export function Radio({ checked, defaultChecked, name, value, onChange, disabled, className, children }: RadioProps) {
  const props: Record<string, any> = { type: "radio", name, value, disabled,
    onChange: (e: any) => onChange && onChange(e.target.value, e) };
  if (checked !== undefined) props.checked = checked;
  else if (defaultChecked !== undefined) props.defaultChecked = defaultChecked;
  return h("label", { className: cx("ds-radio", className) },
    h("input", props),
    h("span", { className: "ds-radio__dot" }),
    children != null ? h("span", null, children) : null
  );
}

/* ---- RadioGroup (controlled or uncontrolled) ----------------------------
   options: [{ value, label, disabled? }]. Pass `value` for controlled or
   `defaultValue` for uncontrolled. onChange receives (value, event). */
export function RadioGroup({ value, defaultValue, onChange, name, options = [], className }: RadioGroupProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const active = value !== undefined ? value : internal;
  const select = (v: any, e: any) => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v, e);
  };
  return h("div", { className: cx("ds-radio-group", className), role: "radiogroup" },
    options.map((opt) => h(Radio, {
      key: opt.value,
      name, value: opt.value,
      checked: active === opt.value,
      disabled: opt.disabled,
      onChange: select,
    }, opt.label))
  );
}
