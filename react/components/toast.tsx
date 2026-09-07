"use client"

import * as React from "react"
import { Toast as ToastPrimitive } from "@base-ui/react/toast"

import { cx, type WithClassName } from "../lib/cx.js"
import { Button } from "./button.js"
import { XIcon, CheckCircleIcon, InfoIcon, WarningIcon, XCircleIcon, SpinnerIcon } from "@phosphor-icons/react"

const toast = ToastPrimitive.createToastManager()

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />
}

function ToastViewport({ className, ...props }: WithClassName<ToastPrimitive.Viewport.Props>) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cx("ds-toast-viewport", className)}
      {...props}
    />
  )
}

function Toast({ className, ...props }: WithClassName<ToastPrimitive.Root.Props>) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      className={cx("ds-toast", className)}
      {...props}
    />
  )
}

function ToastContent({ className, ...props }: WithClassName<ToastPrimitive.Content.Props>) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cx("ds-toast-content", className)}
      {...props}
    />
  )
}

function ToastTitle({ className, ...props }: WithClassName<ToastPrimitive.Title.Props>) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cx("ds-toast-title", className)}
      {...props}
    />
  )
}

function ToastDescription({
  className,
  ...props
}: WithClassName<ToastPrimitive.Description.Props>) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cx("ds-toast-description", className)}
      {...props}
    />
  )
}

function ToastAction({
  className,
  render = <Button variant="outline" size="sm" />,
  ...props
}: WithClassName<ToastPrimitive.Action.Props>) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      render={render}
      className={cx("ds-toast-action", className)}
      {...props}
    />
  )
}

function ToastClose({
  className,
  children,
  render = <Button variant="ghost" size="icon-sm" />,
  ...props
}: WithClassName<ToastPrimitive.Close.Props>) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close toast"
      render={render}
      className={cx("ds-toast-close", className)}
      {...props}
    >
      {children ?? (
        <XIcon aria-hidden="true" />
      )}
    </ToastPrimitive.Close>
  )
}

function ToastIcon({ type }: { type: string | undefined }) {
  let icon: React.ReactNode = null

  if (type === "success") {
    icon = (
      <CheckCircleIcon aria-hidden="true" />
    )
  }

  if (type === "info") {
    icon = (
      <InfoIcon aria-hidden="true" />
    )
  }

  if (type === "warning") {
    icon = (
      <WarningIcon aria-hidden="true" />
    )
  }

  if (type === "error") {
    icon = (
      <XCircleIcon className="ds-toast-icon--error" aria-hidden="true" />
    )
  }

  if (type === "loading") {
    icon = (
      <SpinnerIcon className="ds-toast-icon--loading" aria-hidden="true" />
    )
  }

  if (!icon) {
    return null
  }

  return (
    <span
      data-slot="toast-icon"
      className="ds-toast-icon"
    >
      {icon}
    </span>
  )
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager()

  return toasts.map((toastItem) => (
    <Toast key={toastItem.id} toast={toastItem}>
      <ToastContent>
        <ToastIcon type={toastItem.type} />
        <div className="ds-toast-body">
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastAction />
        <ToastClose />
      </ToastContent>
    </Toast>
  ))
}

function Toaster({
  children,
  toastManager = toast,
  ...props
}: ToastPrimitive.Provider.Props) {
  return (
    <ToastProvider toastManager={toastManager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

const createToastManager = ToastPrimitive.createToastManager
const useToastManager = ToastPrimitive.useToastManager

export {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  useToastManager,
}