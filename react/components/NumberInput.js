import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Number input -------------------------------------------------------
   A numeric field flanked by −/+ stepper buttons (.ds-number-input). The
   buttons increment / decrement by `step`, clamped to `min`/`max`, and disable
   themselves at the bounds. Controlled (`value`) or uncontrolled
   (`defaultValue`); the value is a number (or null when the field is cleared).
   Styling: css/components/number-input.css. */
const clamp = (n, min, max) => {
  let v = n;
  if (min != null && v < min) v = min;
  if (max != null && v > max) v = max;
  return v;
};

export const NumberInput = React.forwardRef(function NumberInput(
  { value, defaultValue, onChange, min, max, step = 1, disabled, className, id, ...rest },
  ref
) {
  const controlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? null);
  const current = controlled ? value : internal;

  const set = (next) => {
    if (!controlled) setInternal(next);
    onChange && onChange(next);
  };

  // Base for stepping when the field is empty: clamp 0 into range.
  const base = current == null ? clamp(0, min, max) : current;

  const stepBy = (dir) => {
    if (disabled) return;
    set(clamp(base + dir * step, min, max));
  };

  const onInput = (e) => {
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
