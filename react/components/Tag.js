import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Tag / Label ---------------------------------------------------------
   A small inline uppercase pill. Pass a `status` for a colored, tinted
   variant. When `onRemove` is provided a trailing × button is rendered and
   the tag gains room for it; the handler fires on click. Children are the
   label content; extra props spread onto the root <span>. */
export const Tag = React.forwardRef(function Tag(
  { status, onRemove, className, children, ...rest }, ref
) {
  return h("span", {
    ref,
    className: cx(
      "ds-tag",
      status && `ds-tag--${status}`,
      onRemove && "ds-tag--removable",
      className
    ),
    ...rest,
  },
    children,
    onRemove
      ? h("button", {
          className: "ds-tag__remove",
          type: "button",
          "aria-label": "Remove",
          onClick: onRemove,
        }, "×")
      : null
  );
});
