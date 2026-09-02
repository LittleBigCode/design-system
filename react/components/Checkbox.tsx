import { cx } from "../lib/cx.js";
import React from "react";

import type { ChangeEvent, ReactNode } from "react";

export interface CheckboxProps {
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
   uncontrolled. onChange receives (checked, event). */
export function Checkbox({ checked, defaultChecked, onChange, disabled, name, className, children }: CheckboxProps) {
  const props: Record<string, any> = { type: "checkbox", disabled, name,
    onChange: (e: any) => onChange && onChange(e.target.checked, e) };
  if (checked !== undefined) props.checked = checked;
  else props.defaultChecked = defaultChecked;
  return h("label", { className: cx("ds-checkbox", className) },
    h("input", props),
    h("span", { className: "ds-checkbox__box" }),
    children != null ? h("span", null, children) : null
  );
}
