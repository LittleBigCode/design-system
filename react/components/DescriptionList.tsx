import { cx } from "../lib/cx.js";
import React from "react";

import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface DescriptionListItem {
  /** The term (rendered as an uppercase label in a <dt>). */
  term: ReactNode;
  /** The description / value (rendered in a <dd>). */
  desc: ReactNode;
}
export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  items: DescriptionListItem[];
}
const h = React.createElement;

/* ---- DescriptionList ----------------------------------------------------- */
/* A <dl> rendered as a two-column term/description grid.
   items: [{ term, desc }] */
export const DescriptionList = React.forwardRef<HTMLDListElement, DescriptionListProps>(function DescriptionList(
  { items = [], className, ...rest }, ref
) {
  return h("dl", {
    ref,
    className: cx("ds-dl", className),
    ...rest,
  },
    items.map((it, i) => h(React.Fragment, { key: i },
      h("dt", { className: "ds-dl__term" }, it.term),
      h("dd", { className: "ds-dl__desc" }, it.desc)
    ))
  );
});
