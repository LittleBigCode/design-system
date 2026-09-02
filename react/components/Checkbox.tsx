import { cx } from "../lib/cx.js";
import React from "react";

import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

export interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "type" | "children"
  > {
  /** Controlled checked state. */
  checked?: boolean;
  /** Initial checked state (uncontrolled). */
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  className?: string;
  children?: ReactNode;
}
const h = React.createElement;

/* ---- Checkbox (controlled or uncontrolled) ------------------------------
   A flat, sharp checkbox built from a real <input type=checkbox> so it stays
   keyboard-accessible and form-bound. Renders the same .ds-checkbox markup the
   CSS styles. Pass `checked` for controlled, or `defaultChecked` for
   uncontrolled. onChange receives (checked, event). Any other prop — `aria-label`,
   `id`, `value`, `required` — spreads onto the input. */
export function Checkbox({ checked, defaultChecked, onChange, disabled, name, className, children, ...rest }: CheckboxProps) {
  // Everything else lands on the <input>, not the <label>: a checkbox in a
  // selection column has no visible text, so `aria-label` is the only name it
  // can have — and the applier used to drop it on the floor.
  const props: Record<string, any> = { ...rest, type: "checkbox", disabled, name,
    onChange: (e: any) => onChange && onChange(e.target.checked, e) };
  if (checked !== undefined) props.checked = checked;
  else props.defaultChecked = defaultChecked;
  return h("label", { className: cx("ds-checkbox", className) },
    h("input", props),
    h("span", { className: "ds-checkbox__box" }),
    children != null ? h("span", null, children) : null
  );
}
