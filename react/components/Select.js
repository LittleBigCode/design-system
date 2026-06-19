import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Select -------------------------------------------------------------
   A native <select> wrapped in .ds-select so the CSS can draw the custom
   chevron and the flat .ds-input look. Forwards a ref to the <select>. Provide
   `options` ([{ value, label, disabled? }]) or pass <option> children. `block`
   makes it full-width. value/defaultValue + onChange behave like a native
   select; extra props (name, required, ...) spread onto the <select>. */
export const Select = React.forwardRef(function Select(
  { value, defaultValue, onChange, options, block, className, children, ...rest }, ref
) {
  const props = { ref, onChange, ...rest };
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
