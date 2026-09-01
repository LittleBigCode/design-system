import { cx } from "../lib/cx.js";
/* ----------------------------------------------------------------------------
   Accordion — a stack of disclosure rows. Each item is a header button + panel;
   the chevron rotates via [aria-expanded]. Works controlled (value/onChange) or
   uncontrolled (defaultOpen). Set `multiple` to allow several panels open at once.
   Styling comes from css/components/accordion.css (global stylesheet).

   items: [{ id, title, content }]
   value / defaultOpen: a single id, or an array of ids (with `multiple`).
   ---------------------------------------------------------------------------- */
import React from "react";

import type { HTMLAttributes, ReactNode } from "react";

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
}

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** The rows to render. */
  items: AccordionItem[];
  /** Allow several panels open at once. Defaults to false (single-open). */
  multiple?: boolean;
  /** Uncontrolled initial open id(s). */
  defaultOpen?: string | string[];
  /** Controlled open id(s). */
  value?: string | string[];
  /**
   * Fires on toggle. With `multiple` it receives the array of open ids,
   * otherwise the single open id (or null when all are closed).
   */
  onChange?: (value: string | string[] | null) => void;
}

const h = React.createElement;

const toArray = (v: any) => (v == null ? [] : Array.isArray(v) ? v : [v]);

export function Accordion({
  items = [],
  multiple = false,
  defaultOpen,
  value,
  onChange,
  className,
  ...rest
}: AccordionProps) {
  const controlled = value !== undefined;
  const [internal, setInternal] = React.useState(() => toArray(defaultOpen));
  const openIds = controlled ? toArray(value) : internal;

  const isOpen = (id: any) => openIds.indexOf(id) !== -1;

  const toggle = (id: any) => {
    let next;
    if (multiple) {
      next = isOpen(id) ? openIds.filter((x) => x !== id) : [...openIds, id];
    } else {
      next = isOpen(id) ? [] : [id];
    }
    if (!controlled) setInternal(next);
    if (onChange) onChange(multiple ? next : (next[0] ?? null));
  };

  return h("div", { className: cx("ds-accordion", className), ...rest },
    items.map((it) => {
      const open = isOpen(it.id);
      const panelId = `ds-acc-panel-${it.id}`;
      const headerId = `ds-acc-header-${it.id}`;
      return h("div", { key: it.id, className: "ds-accordion__item" },
        h("button", {
          type: "button",
          id: headerId,
          className: "ds-accordion__header",
          "aria-expanded": open,
          "aria-controls": panelId,
          onClick: () => toggle(it.id),
        },
          h("span", null, it.title),
          h("span", { className: "ds-accordion__chevron", "aria-hidden": "true" })
        ),
        h("div", {
          id: panelId,
          role: "region",
          "aria-labelledby": headerId,
          className: "ds-accordion__panel",
          hidden: !open,
        }, it.content)
      );
    })
  );
}
