"use client"

import * as React from "react"
import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar"

import { bcx } from "../lib/baseClass.js"
import { cx } from "../lib/cx.js"

/* Toolbar — a strip of controls with roving focus.
   ---------------------------------------------------------------------------
   Base UI's Toolbar underneath, which is the whole reason the source wins:
   0.11's Toolbar was a flex row, so every control in it was its own tab stop.
   This one is one stop, and the arrow keys walk it.

   CROSS-BATCH: the source composes ToolbarButton onto its own `Button` and
   ToolbarInput onto its own `Input`, both of which arrive in batch 7. The
   incumbents are class appliers with no `render` and they live in
   react/index.tsx, so importing them here would be a cycle. The parts apply
   `.ds-button` / `.ds-input` directly instead — the same visual contract, no
   new element — and batch 7 re-wires them to the symbols. */
function Toolbar({ className, ...props }: ToolbarPrimitive.Root.Props) {
  return (
    <ToolbarPrimitive.Root
      data-slot="toolbar"
      className={bcx("ds-toolbar", className)}
      {...props}
    />
  )
}

function ToolbarGroup({ className, ...props }: ToolbarPrimitive.Group.Props) {
  return (
    <ToolbarPrimitive.Group
      data-slot="toolbar-group"
      className={bcx("ds-toolbar-group", className)}
      {...props}
    />
  )
}

/* Same size vocabulary and same `icon-` stripping icon-button.tsx landed in
   batch 3, so a toolbar's square buttons spell their size the way every other
   square button in the package does. `icon-sm` is the default because that is
   what a dense action strip wants. */
function ToolbarButton({
  className,
  variant,
  size = "icon-sm",
  ...props
}: ToolbarPrimitive.Button.Props & {
  /** Re-wired onto the incumbent Button's two variants until batch 7 lands the
   *  source's own. Omit for the ghost button the source calls `ghost`. */
  variant?: "primary" | "danger"
  size?: "icon" | "icon-xs" | "icon-sm" | "icon-lg" | "xs" | "sm" | "lg"
}) {
  const step = size.replace(/^icon-?/, "")
  return (
    <ToolbarPrimitive.Button
      data-slot="toolbar-button"
      className={bcx(
        cx(
          "ds-button",
          size.startsWith("icon") && "ds-button--icon",
          variant && `ds-button--${variant}`,
          step && `ds-button--${step}`,
          "ds-toolbar-button",
        ),
        className,
      )}
      {...props}
    />
  )
}

function ToolbarLink({ className, ...props }: ToolbarPrimitive.Link.Props) {
  return (
    <ToolbarPrimitive.Link
      data-slot="toolbar-link"
      className={bcx("ds-toolbar-link", className)}
      {...props}
    />
  )
}

function ToolbarInput({ className, ...props }: ToolbarPrimitive.Input.Props) {
  return (
    <ToolbarPrimitive.Input
      data-slot="toolbar-input"
      className={bcx("ds-input ds-toolbar-input", className)}
      {...props}
    />
  )
}

function ToolbarSeparator({
  className,
  ...props
}: ToolbarPrimitive.Separator.Props) {
  return (
    <ToolbarPrimitive.Separator
      data-slot="toolbar-separator"
      className={bcx("ds-toolbar-separator", className)}
      {...props}
    />
  )
}

export {
  Toolbar,
  ToolbarGroup,
  ToolbarButton,
  ToolbarLink,
  ToolbarInput,
  ToolbarSeparator,
}
