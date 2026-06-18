import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Checkbox (controlled or uncontrolled) ------------------------------
   A flat, sharp checkbox built from a real <input type=checkbox> so it stays
   keyboard-accessible and form-bound. Renders the same .ds-checkbox markup the
   CSS styles. Pass `checked` for controlled, or `defaultChecked` for
   uncontrolled. onChange receives (checked, event). */
export function Checkbox({ checked, defaultChecked, onChange, disabled, name, className, children }) {
  const props = { type: "checkbox", disabled, name,
    onChange: (e) => onChange && onChange(e.target.checked, e) };
  if (checked !== undefined) props.checked = checked;
  else props.defaultChecked = defaultChecked;
  return h("label", { className: cx("ds-checkbox", className) },
    h("input", props),
    h("span", { className: "ds-checkbox__box" }),
    children != null ? h("span", null, children) : null
  );
}
