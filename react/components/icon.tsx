"use client"

import * as React from "react"

import { cx } from "../lib/cx.js"
import { icons, type IconName } from "./icons.js"

/* Source's own icon.tsx imports one named component per icon from
   @phosphor-icons/react and keeps its own tiny registry. That's the wrong
   shape here: icons.tsx's geometry map already serves <ds-icon> too, and a
   second copy would duplicate it and add the dependency back for no gain
   (see icons.tsx's own note). This keeps source's prop contract — no `size`,
   `strokeWidth` or `title`, sizing is `.ds-icon`'s CSS — over its data source. */
function Icon({
  name,
  className,
  ...props
}: { name: IconName | (string & {}) } & React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      data-slot="icon"
      viewBox="0 0 256 256"
      className={cx("ds-icon", className)}
      dangerouslySetInnerHTML={{ __html: icons[name as IconName] || "" }}
      {...props}
    />
  )
}

export { Icon }
