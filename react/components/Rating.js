import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

const STAR_PATH =
  "M10 1.5l2.47 5.18 5.68.72-4.2 3.87 1.1 5.63L10 14.98 4.95 17.9l1.1-5.63-4.2-3.87 5.68-.72L10 1.5z";

function Star() {
  return h("svg", { viewBox: "0 0 20 20", "aria-hidden": "true", focusable: "false" },
    h("path", { d: STAR_PATH })
  );
}

/* ---- Rating --------------------------------------------------------------
   A 5-star rating. Controlled via `value` or uncontrolled via `defaultValue`;
   `onChange` receives the new value. Click a star or focus the group and use
   ArrowLeft/ArrowRight to move then Enter (or Space) to commit. `readOnly`
   renders plain (non-interactive) stars for display. role=group with a star
   label per item. */
export function Rating({ value, defaultValue, max = 5, onChange, readOnly = false, className, ...rest }) {
  const [internal, setInternal] = React.useState(defaultValue ?? 0);
  const current = value !== undefined ? value : internal;
  const [focusIndex, setFocusIndex] = React.useState(null);

  const commit = (v) => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };

  // The roving value driven by the keyboard (defaults to the current rating).
  const active = focusIndex != null ? focusIndex : current;

  const onKeyDown = (e) => {
    if (readOnly) return;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setFocusIndex(Math.max(1, active - 1));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setFocusIndex(Math.min(max, (active || 0) + 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (focusIndex != null) commit(focusIndex);
    }
  };

  const stars = [];
  for (let i = 1; i <= max; i += 1) {
    const on = i <= current;
    if (readOnly) {
      stars.push(h("span", {
        key: i,
        className: cx("ds-rating__star", on && "is-on"),
      }, h(Star)));
    } else {
      stars.push(h("button", {
        key: i,
        type: "button",
        className: cx("ds-rating__star", on && "is-on"),
        "aria-label": `${i} star${i === 1 ? "" : "s"}`,
        "aria-pressed": i === current,
        tabIndex: -1,
        onClick: () => commit(i),
        onMouseEnter: () => setFocusIndex(null),
      }, h(Star)));
    }
  }

  return h("div", {
    className: cx("ds-rating", readOnly && "ds-rating--readonly", className),
    role: readOnly ? "img" : "group",
    "aria-label": readOnly ? `Rating: ${current} of ${max}` : "Rating",
    tabIndex: readOnly ? undefined : 0,
    onKeyDown: readOnly ? undefined : onKeyDown,
    onBlur: readOnly ? undefined : () => setFocusIndex(null),
    ...rest,
  }, stars);
}
