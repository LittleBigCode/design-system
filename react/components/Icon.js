import React from "react";
import { icons } from "./icons.js";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

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
}) {
  return h("svg", {
    className: cx("ds-icon", className),
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    "stroke-width": strokeWidth,
    role: title ? "img" : undefined,
    "aria-hidden": title ? undefined : "true",
    dangerouslySetInnerHTML: {
      __html: (title ? `<title>${title}</title>` : "") + (icons[name] || ""),
    },
    ...rest,
  });
}
