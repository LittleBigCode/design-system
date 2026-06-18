import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

/* ---- Avatar -------------------------------------------------------------- */
/* A flat square tile. With `src` it renders a cover-fit `<img>` clipped to the
   square; otherwise it shows the uppercase `initials`. `size` picks "sm" | "lg"
   (omit for the default 36px). forwardRef lands on the root <span>. */
export const Avatar = React.forwardRef(function Avatar(
  { src, alt, initials, size, className, ...rest }, ref
) {
  return h("span", {
    ref,
    className: cx("ds-avatar", size && `ds-avatar--${size}`, className),
    ...rest,
  },
    src
      ? h("img", { className: "ds-avatar__img", src, alt: alt ?? "" })
      : initials
  );
});

/* ---- AvatarGroup --------------------------------------------------------- */
/* Overlapping stack of avatars. When `max` is set and there are more children
   than `max`, only the first `max` are shown and a trailing "+N" count tile
   (styled as a .ds-avatar) reports the remainder. */
export function AvatarGroup({ max, children, className, ...rest }) {
  const items = React.Children.toArray(children);
  const overflow = max != null && items.length > max ? items.length - max : 0;
  const shown = overflow > 0 ? items.slice(0, max) : items;

  return h("div", {
    className: cx("ds-avatar-group", className),
    ...rest,
  },
    shown,
    overflow > 0
      ? h("span", {
          className: "ds-avatar ds-avatar--count",
          "aria-label": `${overflow} more`,
        }, `+${overflow}`)
      : null
  );
}
