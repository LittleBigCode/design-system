import { cx } from "../lib/cx.js";
/* PageHeader — breadcrumb + title + actions, with an optional tabs row.
   Pass `breadcrumb`, `actions`, and `tabs` as elements; `title`/`subtitle` as text. */
import React from "react";

import type { HTMLAttributes, ReactNode } from "react";

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title?: ReactNode;
  subtitle?: ReactNode;
  /** A <Breadcrumb> element rendered above the title. */
  breadcrumb?: ReactNode;
  /** Action elements (buttons) rendered on the right of the title row. */
  actions?: ReactNode;
  /** A tabs element rendered flush with the bottom rule. */
  tabs?: ReactNode;
  /** Remove the bottom padding of the title row (when tabs sit directly below). */
  flush?: boolean;
  className?: string;
}
const h = React.createElement;

export function PageHeader({ title, subtitle, breadcrumb, actions, tabs, flush, className, ...rest }: PageHeaderProps) {
  return h("header", { className: cx("ds-page-header", flush && "ds-page-header--flush", className), ...rest },
    breadcrumb || null,
    h("div", { className: "ds-page-header__top" },
      h("div", { className: "ds-page-header__titles" },
        h("h1", { className: "ds-page-header__title" }, title),
        subtitle ? h("p", { className: "ds-page-header__subtitle" }, subtitle) : null),
      actions ? h("div", { className: "ds-page-header__actions" }, actions) : null),
    tabs ? h("div", { className: "ds-page-header__tabs" }, tabs) : null);
}
