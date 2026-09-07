"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"

import { cx, type WithClassName } from "../lib/cx.js"
import { Button } from "./button.js"

function AlertDialog({ ...props }: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({ ...props }: AlertDialogPrimitive.Portal.Props) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: WithClassName<AlertDialogPrimitive.Backdrop.Props>) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cx("ds-alert-dialog-overlay", className)}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  size = "default",
  ...props
}: WithClassName<AlertDialogPrimitive.Popup.Props> & {
  size?: "default" | "sm"
}) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        data-size={size}
        className={cx("ds-alert-dialog-content", className)}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cx("ds-alert-dialog-header", className)}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cx("ds-alert-dialog-footer", className)}
      {...props}
    />
  )
}

function AlertDialogMedia({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cx("ds-alert-dialog-media", className)}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof AlertDialogPrimitive.Title>>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cx("ds-alert-dialog-title", className)}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof AlertDialogPrimitive.Description>>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cx("ds-alert-dialog-description", className)}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="alert-dialog-action"
      className={cx(className)}
      {...props}
    />
  )
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: WithClassName<AlertDialogPrimitive.Close.Props> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      className={cx(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}