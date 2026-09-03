"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import { bcx } from "../lib/baseClass.js"

/* ----------------------------------------------------------------------------
   Tooltip — batch 8's first defect swap.

   0.11's Tooltip.js rendered `role="tooltip"` on a sibling <span> with no `id`,
   and put no `aria-describedby` on the trigger. Nothing tied the two together,
   so a screen reader never announced the label — the tooltip was decoration for
   sighted mouse users only. There was no Escape dismissal either, which WCAG
   1.4.13 (Content on Hover or Focus) requires of any hover-revealed content.

   Base UI's tooltip wires `aria-describedby` from trigger to popup, dismisses
   on Escape, and keeps the popup hoverable so a reader can move the pointer
   into it without it vanishing. The old `label` / `placement` props become
   composition: see docs/migration/from-0.11.md for the recipe.
   ---------------------------------------------------------------------------- */

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="ds-tooltip-positioner"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={bcx("ds-tooltip-content", className)}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="ds-tooltip-arrow" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
