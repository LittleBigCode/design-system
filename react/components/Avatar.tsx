import { cx } from "../lib/cx.js";
import React from "react";

import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image source. When set, renders a cover-fit image clipped to the square. */
  src?: string;
  /** Alt text for the image. */
  alt?: string;
  /** Fallback content shown when there is no `src` (uppercased by CSS). */
  initials?: ReactNode;
  /** Size of the tile. Omit for the default 36px. */
  size?: "sm" | "lg";
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Cap the number of visible avatars; the rest collapse into a "+N" tile. */
  max?: number;
  children?: ReactNode;
}
const h = React.createElement;

/* ---- Avatar -------------------------------------------------------------- */
/* A flat square tile. With `src` it renders a cover-fit `<img>` clipped to the
   square; otherwise it shows the uppercase `initials`. `size` picks "sm" | "lg"
   (omit for the default 36px). forwardRef lands on the root <span>. */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
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
export function AvatarGroup({ max, children, className, ...rest }: AvatarGroupProps) {
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
