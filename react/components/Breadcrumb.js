import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Breadcrumb ---------------------------------------------------------
   items: [{ label, href }] — the last item is rendered as the current page
   (aria-current="page") and is never a link, even if it has an href. */
export const Breadcrumb = React.forwardRef(function Breadcrumb(
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
