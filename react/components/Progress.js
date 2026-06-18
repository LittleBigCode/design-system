import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Progress ------------------------------------------------------------
   A determinate or indeterminate progress bar. `value`/`max` set the fill;
   `status` recolors the bar; `indeterminate` animates a sliding segment.
   When `label` is given, a caption row with the percentage renders above. */
export const Progress = React.forwardRef(function Progress(
  { value = 0, max = 100, status, indeterminate = false, label, className, ...rest }, ref
) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  const rounded = Math.round(pct);

  const aria = indeterminate
    ? { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": max }
    : {
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": max,
        "aria-valuenow": value,
      };
  if (label != null) aria["aria-label"] = typeof label === "string" ? label : undefined;

  return h(React.Fragment, null,
    label != null
      ? h("div", { className: "ds-progress__label" },
          h("span", null, label),
          indeterminate
            ? null
            : h("span", { className: "ds-progress__value" }, `${rounded}%`)
        )
      : null,
    h("div", {
      ref,
      className: cx(
        "ds-progress",
        status && `ds-progress--${status}`,
        indeterminate && "ds-progress--indeterminate",
        className
      ),
      ...aria,
      ...rest,
    },
      h("div", {
        className: "ds-progress__bar",
        style: indeterminate ? undefined : { width: `${pct}%` },
      })
    )
  );
});
