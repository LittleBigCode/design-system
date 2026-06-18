import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Radio --------------------------------------------------------------
   A single flat radio built from a real <input type=radio>. Renders the
   .ds-radio markup the CSS styles. Usually driven by a RadioGroup, but can be
   used standalone with `name` + `value` + `checked`. */
export function Radio({ checked, defaultChecked, name, value, onChange, disabled, className, children }) {
  const props = { type: "radio", name, value, disabled,
    onChange: (e) => onChange && onChange(e.target.value, e) };
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
export function RadioGroup({ value, defaultValue, onChange, name, options = [], className }) {
  const [internal, setInternal] = React.useState(defaultValue);
  const active = value !== undefined ? value : internal;
  const select = (v, e) => {
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
