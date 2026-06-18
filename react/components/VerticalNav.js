import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

const hasActiveChild = (children) =>
  Array.isArray(children) && children.some((c) => c.active);

/* A single link row. */
function NavLink(item) {
  return h("a", {
    className: cx("ds-vnav__item", item.active && "is-active"),
    href: item.href,
    "aria-current": item.active ? "page" : undefined,
  }, item.label);
}

/* A collapsible parent: a trigger button + an indented child list. Starts
   open when it (or one of its children) is active. */
function NavCollapsible({ item }) {
  const [open, setOpen] = React.useState(
    Boolean(item.active) || hasActiveChild(item.children)
  );
  return h(React.Fragment, null,
    h("button", {
      type: "button",
      className: cx("ds-vnav__item", "ds-vnav__item--collapsible", item.active && "is-active"),
      "aria-expanded": open,
      onClick: () => setOpen((v) => !v),
    },
      h("span", null, item.label),
      h("span", { className: "ds-vnav__caret", "aria-hidden": "true" }, "›")
    ),
    h("div", { className: "ds-vnav__children" },
      item.children.map((child, i) => h(NavLink, { key: child.href || i, ...child }))
    )
  );
}

function NavNode({ item }) {
  return Array.isArray(item.children) && item.children.length
    ? h(NavCollapsible, { item })
    : h(NavLink, item);
}

/* ---- VerticalNav --------------------------------------------------------
   items: [{ label, href, active, children? }]. An item with a `children`
   array renders as a collapsible group of sub-links. */
export const VerticalNav = React.forwardRef(function VerticalNav(
  { items = [], className, ...rest }, ref
) {
  return h("nav", {
    ref,
    className: cx("ds-vnav", className),
    "aria-label": "Sidebar",
    ...rest,
  },
    items.map((item, i) => h(NavNode, { key: item.href || i, item }))
  );
});
