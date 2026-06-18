import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Skeleton ------------------------------------------------------------ */
/* A shimmering loading placeholder. `variant` picks the shape
   ("text" | "line" | "circle" | "block"), `width`/`height` override the size
   inline, and `count` (> 1) renders N stacked lines. */
export const Skeleton = React.forwardRef(function Skeleton(
  { variant = "line", width, height, count = 1, className, ...rest }, ref
) {
  const cls = cx("ds-skeleton", variant && `ds-skeleton--${variant}`, className);

  const make = (key, useRef) => h("span", {
    key,
    ref: useRef ? ref : undefined,
    className: cls,
    style: { width, height },
    "aria-hidden": "true",
    ...rest,
  });

  if (count > 1) {
    return h(React.Fragment, null,
      Array.from({ length: count }, (_, i) => make(i, false))
    );
  }
  return make(undefined, true);
});
