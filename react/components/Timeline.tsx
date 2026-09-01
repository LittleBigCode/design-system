import { cx } from "../lib/cx.js";
import React from "react";

import type { HTMLAttributes, ReactNode } from "react";

export interface TimelineItem {
  /** Timestamp / label, rendered above the title in faint uppercase. */
  time?: ReactNode;
  /** The event title. */
  title?: ReactNode;
  /** Supporting description. */
  body?: ReactNode;
  /** Recolors the dot. Omit for the default neutral rule color. */
  status?: "success" | "warning" | "danger" | "info" | "neutral";
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  /** The events to render, oldest or newest first as you supply them. */
  items: TimelineItem[];
}
const h = React.createElement;

/* ---- Timeline -----------------------------------------------------------
   A vertical event list with a left rail and a status dot per item.
   Styling comes from css/components/timeline.css (global stylesheet).

   items: [{ time, title, body, status }]
   status: "success" | "warning" | "danger" | "info" | "neutral" */
export function Timeline({ items = [], className, ...rest }: TimelineProps) {
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
