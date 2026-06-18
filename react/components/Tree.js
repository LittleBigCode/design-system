/* ----------------------------------------------------------------------------
   Tree view — a nested, expand/collapse disclosure list with single selection.
   Expansion is uncontrolled (seeded by `defaultExpanded`, an array of node ids);
   selection is kept internally and surfaced via `onSelect(node)`. The chevron
   rotates via [aria-expanded]; collapsed branches are simply not rendered.
   Styling comes from css/components/tree.css (global stylesheet).

   nodes: [{ id, label, children? }]
   ---------------------------------------------------------------------------- */
import React from "react";

const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

export function Tree({ nodes = [], defaultExpanded = [], onSelect, className, ...rest }) {
  const [expanded, setExpanded] = React.useState(() => new Set(defaultExpanded));
  const [selectedId, setSelectedId] = React.useState(null);

  const toggle = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderNode = (node) => {
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;
    const isExpanded = expanded.has(node.id);
    const isSelected = selectedId === node.id;

    return h("li", {
      key: node.id,
      className: "ds-tree__item",
      role: "treeitem",
      "aria-expanded": hasChildren ? isExpanded : undefined,
      "aria-selected": isSelected,
    },
      h("div", { className: "ds-tree__row" },
        hasChildren
          ? h("button", {
              type: "button",
              className: "ds-tree__toggle",
              "aria-expanded": isExpanded,
              "aria-label": "Toggle",
              onClick: () => toggle(node.id),
            }, "›")
          : h("span", {
              className: cx("ds-tree__toggle", "ds-tree__toggle--leaf"),
              "aria-hidden": "true",
            }),
        h("span", {
          className: cx("ds-tree__label", isSelected && "is-selected"),
          tabIndex: 0,
          onClick: () => { setSelectedId(node.id); if (onSelect) onSelect(node); },
        }, node.label)
      ),
      hasChildren && isExpanded
        ? h("ul", { className: "ds-tree__children", role: "group" },
            node.children.map(renderNode))
        : null
    );
  };

  return h("ul", {
    className: cx("ds-tree", className),
    role: "tree",
    ...rest,
  }, nodes.map(renderNode));
}
