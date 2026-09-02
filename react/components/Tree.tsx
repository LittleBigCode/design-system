import { cx } from "../lib/cx.js";
/* ----------------------------------------------------------------------------
   Tree view — a nested, expand/collapse disclosure list with single selection.
   Expansion is uncontrolled (seeded by `defaultExpanded`, an array of node ids);
   selection is kept internally and surfaced via `onSelect(node)`. The chevron
   rotates via [aria-expanded]; collapsed branches are simply not rendered.
   Styling comes from css/components/tree.css (global stylesheet).

   nodes: [{ id, label, children? }]
   ---------------------------------------------------------------------------- */
import React from "react";

import type { HTMLAttributes, ReactNode } from "react";

export interface TreeNode {
  id: string;
  label: ReactNode;
  children?: TreeNode[];
}

export interface TreeProps extends Omit<HTMLAttributes<HTMLUListElement>, "onSelect"> {
  /** The root nodes to render. */
  nodes: TreeNode[];
  /** Node ids expanded initially (expansion is uncontrolled). */
  defaultExpanded?: string[];
  /** Fires with the node when a label is chosen. */
  onSelect?: (node: TreeNode) => void;
}

const h = React.createElement;

/* The rows a reader can actually reach, in the order they are painted. Arrow
   navigation is linear over *visible* nodes, so a collapsed branch's children
   have to be absent from this list, not merely skipped when walking it. */
type Row = { node: any; parentId: any; hasChildren: boolean; isExpanded: boolean };

function flattenVisible(list: any[], expanded: Set<any>, parentId: any = null, out: Row[] = []) {
  for (const node of list) {
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;
    const isExpanded = hasChildren && expanded.has(node.id);
    out.push({ node, parentId, hasChildren, isExpanded });
    if (isExpanded) flattenVisible(node.children, expanded, node.id, out);
  }
  return out;
}

export function Tree({ nodes = [], defaultExpanded = [], onSelect, className, ...rest }: TreeProps) {
  const [expanded, setExpanded] = React.useState(() => new Set(defaultExpanded));
  const [selectedId, setSelectedId] = React.useState<any>(null);
  /* Where the single tab stop sits. It follows focus rather than selection, so
     tabbing out of the tree and back returns to the row the reader left. */
  const [activeId, setActiveId] = React.useState<any>(null);
  const labelRefs = React.useRef(new Map<any, HTMLElement | null>());

  const visible = React.useMemo(
    () => flattenVisible(nodes, expanded),
    [nodes, expanded],
  );
  const tabStopId = visible.some((r) => r.node.id === activeId)
    ? activeId
    : visible.some((r) => r.node.id === selectedId)
      ? selectedId
      : visible[0]?.node.id;

  const focusRow = (id: any) => labelRefs.current.get(id)?.focus();
  const select = (node: any) => {
    setSelectedId(node.id);
    if (onSelect) onSelect(node);
  };

  const toggle = (id: any) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const onKeyDown = (e: any, id: any) => {
    const i = visible.findIndex((r) => r.node.id === id);
    if (i === -1) return;
    const row = visible[i];
    switch (e.key) {
      case "ArrowDown":
        if (!visible[i + 1]) return;
        focusRow(visible[i + 1].node.id);
        break;
      case "ArrowUp":
        if (!visible[i - 1]) return;
        focusRow(visible[i - 1].node.id);
        break;
      /* Right opens a closed branch, then steps into it — two presses to enter,
         which is what lets one key both reveal and descend. */
      case "ArrowRight":
        if (!row.hasChildren) return;
        if (!row.isExpanded) toggle(id);
        else if (visible[i + 1]) focusRow(visible[i + 1].node.id);
        break;
      /* Left mirrors it: close an open branch, else climb to the parent. */
      case "ArrowLeft":
        if (row.isExpanded) toggle(id);
        else if (row.parentId != null) focusRow(row.parentId);
        else return;
        break;
      case "Home":
        focusRow(visible[0].node.id);
        break;
      case "End":
        focusRow(visible[visible.length - 1].node.id);
        break;
      case "Enter":
      case " ":
        select(row.node);
        break;
      default:
        return;
    }
    e.preventDefault();
  };

  const renderNode = (node: any) => {
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
              /* Out of the tab order: the tree is one tab stop and the arrow
                 keys expand, so a per-row chevron would put every branch back
                 in the sequence roving tabindex exists to collapse. */
              tabIndex: -1,
              "aria-expanded": isExpanded,
              "aria-label": "Toggle",
              onClick: () => toggle(node.id),
            }, "›")
          : h("span", {
              className: cx("ds-tree__toggle", "ds-tree__toggle--leaf"),
              "aria-hidden": "true",
            }),
        h("span", {
          ref: (el: HTMLElement | null): void => { labelRefs.current.set(node.id, el); },
          className: cx("ds-tree__label", isSelected && "is-selected"),
          tabIndex: node.id === tabStopId ? 0 : -1,
          onFocus: () => setActiveId(node.id),
          onKeyDown: (e: any) => onKeyDown(e, node.id),
          onClick: () => select(node),
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
