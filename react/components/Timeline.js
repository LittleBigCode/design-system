import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Timeline -----------------------------------------------------------
   A vertical event list with a left rail and a status dot per item.
   Styling comes from css/components/timeline.css (global stylesheet).

   items: [{ time, title, body, status }]
   status: "success" | "warning" | "danger" | "info" | "neutral" */
export function Timeline({ items = [], className, ...rest }) {
  return h("ol", {
    className: cx("ds-timeline", className),
    ...rest,
  },
    items.map((it, i) => h("li", { key: i, className: "ds-timeline__item" },
      h("span", { className: cx("ds-timeline__dot", it.status && `is-${it.status}`) }),
      it.time != null ? h("div", { className: "ds-timeline__time" }, it.time) : null,
      it.title != null ? h("div", { className: "ds-timeline__title" }, it.title) : null,
      it.body != null ? h("div", { className: "ds-timeline__body" }, it.body) : null
    ))
  );
}
