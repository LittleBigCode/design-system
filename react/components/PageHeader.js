/* PageHeader — breadcrumb + title + actions, with an optional tabs row.
   Pass `breadcrumb`, `actions`, and `tabs` as elements; `title`/`subtitle` as text. */
import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

export function PageHeader({ title, subtitle, breadcrumb, actions, tabs, flush, className, ...rest }) {
  return h("header", { className: cx("ds-page-header", flush && "ds-page-header--flush", className), ...rest },
    breadcrumb || null,
    h("div", { className: "ds-page-header__top" },
      h("div", { className: "ds-page-header__titles" },
        h("h1", { className: "ds-page-header__title" }, title),
        subtitle ? h("p", { className: "ds-page-header__subtitle" }, subtitle) : null),
      actions ? h("div", { className: "ds-page-header__actions" }, actions) : null),
    tabs ? h("div", { className: "ds-page-header__tabs" }, tabs) : null);
}
