import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Range (controlled or uncontrolled) ---------------------------------
   A flat <input type=range> with a square thumb (.ds-range). Forwards a ref to
   the input. Pass `value` for controlled or `defaultValue` for uncontrolled;
   onChange receives (numberValue, event). min/max/step and other props spread
   onto the input. */
export const Range = React.forwardRef(function Range(
  { value, defaultValue, onChange, min, max, step, className, ...rest }, ref
) {
  const props = {
    ref, type: "range", min, max, step,
    className: cx("ds-range", className),
    onChange: (e) => onChange && onChange(e.target.valueAsNumber, e),
    ...rest,
  };
  if (value !== undefined) props.value = value;
  else if (defaultValue !== undefined) props.defaultValue = defaultValue;
  return h("input", props);
});
