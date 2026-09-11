"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "@phosphor-icons/react"

import { bcx } from "../lib/baseClass.js"
import { cx } from "../lib/cx.js"
import { Button } from "./button.js"

/* ----------------------------------------------------------------------------
   Sheet — the other half of batch 8's drawer merge.

   0.11's one `Drawer` symbol becomes two: `Drawer` (drawer.tsx) is the
   swipeable sheet, and this is the edge-docked panel its `placement` prop
   meant. `<Drawer open placement="right" heading footer>` becomes
   `<Sheet open><SheetContent side="right">` with a `SheetHeader` and a
   `SheetFooter` — the recipe is in docs/migration/from-0.11.md.

   Same swap, same defect: 0.11's Drawer.js had no focus trap and no portal.
   This is a Base UI dialog, so Tab is contained and the panel escapes any
   ancestor's overflow.
   ---------------------------------------------------------------------------- */

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={bcx("ds-sheet-overlay", className)}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        /* The source carried `bg-popover text-popover-foreground` and two
           `data-[side]:w-3/4` Tailwind literals here so its sidebar.tsx could
           override them through tailwind-merge. `sidebar` is incumbent-holds
           and that file never lands, so all four declarations went home to
           sheet.css and the dedupe exception is resolved rather than carried. */
        className={bcx("ds-sheet-content", className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              /* No `sr-only` utility in this package — breadcrumb.tsx and
                 pagination.tsx record the same finding — so the icon-only
                 button is named by `aria-label`, not a visually hidden span. */
              <Button
                variant="ghost"
                size="icon-sm"
                className="ds-sheet-close"
                aria-label="Close"
              />
            }
          >
            <XIcon />
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cx("ds-sheet-header", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cx("ds-sheet-footer", className)}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={bcx("ds-sheet-title", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={bcx("ds-sheet-description", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
