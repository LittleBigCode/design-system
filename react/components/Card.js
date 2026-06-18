import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Card ---------------------------------------------------------------- */
/* A flat bordered surface card. `media` (an <img> src string or any node) is
   rendered full-bleed at the top, `title` becomes the header heading, `footer`
   the bottom rule region, and `children` the body. `clickable` turns the whole
   card into a focusable affordance. */
export const Card = React.forwardRef(function Card(
  { title, media, footer, clickable, className, children, ...rest }, ref
) {
  const mediaNode = media == null
    ? null
    : typeof media === "string"
      ? h("img", { className: "ds-card__media", src: media, alt: "" })
      : h("div", { className: "ds-card__media" }, media);

  const interactive = clickable
    ? { tabIndex: 0, role: rest.role ?? "button" }
    : null;

  return h("div", {
    ref,
    className: cx("ds-card", clickable && "ds-card--clickable", className),
    ...interactive,
    ...rest,
  },
    mediaNode,
    title != null ? h("div", { className: "ds-card__header" },
      h("h3", { className: "ds-card__title" }, title)
    ) : null,
    children != null ? h("div", { className: "ds-card__body" }, children) : null,
    footer != null ? h("div", { className: "ds-card__footer" }, footer) : null
  );
});
