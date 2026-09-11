"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { bcx } from "../lib/baseClass.js"

/* Separator — a 1px rule with an orientation, on Base UI so the role and
   aria-orientation follow the axis.

   The source carried `bg-border` and its data-horizontal/data-vertical sizing
   as literal Tailwind utilities on this className, a dedupe exception kept so
   tailwind-merge could dedupe them against ButtonGroupSeparator's and
   SidebarSeparator's own overrides. There is no tailwind-merge here, so the
   exception is resolved rather than carried: the literals are real declarations
   in separator.css and the overrides are `.ds-separator--auto`. */
function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={bcx("ds-separator", className)}
      {...props}
    />
  )
}

export { Separator }
