import { cx } from "../lib/cx.js";
import React from "react";
import { icons } from "./icons.js";

import type { SVGAttributes } from "react";

/** Name of a built-in icon (a key of the `icons` map). */
export type IconName = keyof typeof icons;

export interface IconProps
  extends Omit<SVGAttributes<SVGSVGElement>, "name"> {
  /** Which icon to draw. Any key of the `icons` map; arbitrary strings are
   *  accepted too (an unknown name renders a blank SVG). */
  name: IconName | (string & {});
  /** Edge length. Number (px) or any CSS length. Defaults to "1em" so the icon
   *  follows the surrounding font-size. */
  size?: number | string;
  /** Stroke width of the line geometry. Defaults to 2 (the Lucide standard). */
  strokeWidth?: number | string;
  /** Accessible name. When set, the icon is exposed as role="img" with a
   *  <title>; when omitted the icon is decorative and aria-hidden. */
  title?: string;
}

/** A Lucide-compatible 24×24 stroked line icon. */
const h = React.createElement;

/* ---- Icon ----------------------------------------------------------------
   A Lucide-compatible 24×24 line icon. Looks `name` up in the `icons` map and
   draws it inside a <svg> with the shared stroke conventions (fill none,
   stroke currentColor, round caps/joins). Size defaults to "1em" so the icon
   tracks the surrounding font-size; pass `size` (number or CSS length) to fix
   it. Set `strokeWidth` to thin/thicken the lines.

   Provide a `title` to give the icon an accessible name (role="img" + an inline
   <title>); omit it for decorative icons, which are then aria-hidden. Unknown
   names render an empty (blank) SVG. Extra props spread onto the <svg>. */
export function Icon({
  name,
  size = "1em",
  strokeWidth = 2,
  title,
  className,
  ...rest
}: IconProps) {
  return h("svg", {
    className: cx("ds-icon", className),
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    "stroke-width": strokeWidth,
    role: title ? "img" : undefined,
    "aria-hidden": title ? undefined : "true",
    dangerouslySetInnerHTML: {
      __html: (title ? `<title>${title}</title>` : "") + (icons[name as keyof typeof icons] || ""),
    },
    ...rest,
  });
}
