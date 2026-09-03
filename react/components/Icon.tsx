"use client"

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
  /** @deprecated No effect since 1.0.0-beta.7. The set is Phosphor, which is
   *  filled geometry — there is no stroke to widen. Still accepted so callers
   *  written against the Lucide set keep compiling; use `weight` on a
   *  `@phosphor-icons/react` component if you need a lighter or bolder glyph. */
  strokeWidth?: number | string;
  /** Accessible name. When set, the icon is exposed as role="img" with a
   *  <title>; when omitted the icon is decorative and aria-hidden. */
  title?: string;
}

const h = React.createElement;

/* ---- Icon ----------------------------------------------------------------
   A Phosphor 256×256 filled icon. Looks `name` up in the `icons` map and draws
   it inside a <svg> with the shared conventions (viewBox "0 0 256 256", fill
   currentColor, no stroke). Size defaults to "1em" so the icon tracks the
   surrounding font-size; pass `size` (number or CSS length) to fix it.

   The set moved from Lucide to Phosphor in 1.0.0-beta.7 (batch-plan §1.4). The
   names did not: `search`, `chevron-down`, `log-out` and the rest all still
   resolve, so no caller has to be rewritten. `strokeWidth` no longer does
   anything — filled geometry has no stroke — but it is still accepted rather
   than removed, because it is published API and silently ignoring it costs a
   caller nothing while a hard error costs them a build.

   Provide a `title` to give the icon an accessible name (role="img" + an inline
   <title>); omit it for decorative icons, which are then aria-hidden. Unknown
   names render an empty (blank) SVG. Extra props spread onto the <svg>. */
export function Icon({
  name,
  size = "1em",
  strokeWidth: _strokeWidth,
  title,
  className,
  ...rest
}: IconProps) {
  return h("svg", {
    className: cx("ds-icon", className),
    viewBox: "0 0 256 256",
    width: size,
    height: size,
    role: title ? "img" : undefined,
    "aria-hidden": title ? undefined : "true",
    dangerouslySetInnerHTML: {
      __html: (title ? `<title>${title}</title>` : "") + (icons[name as keyof typeof icons] || ""),
    },
    ...rest,
  });
}