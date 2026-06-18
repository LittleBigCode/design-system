import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- DescriptionList ----------------------------------------------------- */
/* A <dl> rendered as a two-column term/description grid.
   items: [{ term, desc }] */
export const DescriptionList = React.forwardRef(function DescriptionList(
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
