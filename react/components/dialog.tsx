"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cx, type WithClassName } from "../lib/cx.js"
import { Button } from "./button.js"
import { XIcon } from "@phosphor-icons/react"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: WithClassName<DialogPrimitive.Backdrop.Props>) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cx("ds-dialog-overlay", className)}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: WithClassName<DialogPrimitive.Popup.Props> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cx(
          "ds-dialog-content top-1/2 -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 p-6",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button variant="ghost" className="ds-dialog-close" size="icon-sm" />
            }
          >
            <XIcon
            />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cx("ds-dialog-header", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cx("ds-dialog-footer", className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: WithClassName<DialogPrimitive.Title.Props>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cx("ds-dialog-title", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: WithClassName<DialogPrimitive.Description.Props>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cx("ds-dialog-description", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
