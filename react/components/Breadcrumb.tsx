import { cx } from "../lib/cx.js";
import React from "react";

import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface BreadcrumbItem {
  label: ReactNode;
  /** Link target. Omitted (or on the last item) renders plain text. */
  href?: string;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Ordered trail; the last item is the current page. */
  items: BreadcrumbItem[];
}
const h = React.createElement;

/* ---- Breadcrumb ---------------------------------------------------------
   items: [{ label, href }] — the last item is rendered as the current page
   (aria-current="page") and is never a link, even if it has an href. */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { items = [], className, ...rest }, ref
) {
  return h("nav", { ref, "aria-label": "Breadcrumb", ...rest },
    h("ol", { className: cx("ds-breadcrumb", className) },
      items.map((it, i) => {
        const current = i === items.length - 1;
        return h("li", {
          key: it.href || i,
          className: "ds-breadcrumb__item",
          "aria-current": current ? "page" : undefined,
        },
          !current && it.href
            ? h("a", { className: "ds-breadcrumb__link", href: it.href }, it.label)
            : it.label
        );
      })
    )
  );
});
