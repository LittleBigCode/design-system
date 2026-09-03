"use client"

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar"

import { bcx } from "../lib/baseClass.js"
import { Button, type ButtonSize, type ButtonVariant } from "./button.js"
import { Input } from "./input.js"

/* Toolbar — a strip of controls with roving focus.
   ---------------------------------------------------------------------------
   Base UI's Toolbar underneath, which is the whole reason the source wins:
   0.11's Toolbar was a flex row, so every control in it was its own tab stop.
   This one is one stop, and the arrow keys walk it.

   Re-wired onto `Button` and `Input` in 1.0.0-beta.7 — two of batch 6's four
   forward cross-batch imports, and the second and final half of each. Until now
   the parts applied `.ds-button` / `.ds-input` by hand, because both incumbents
   were class appliers with no `render` living in react/index.tsx, where
   importing them would have been a cycle. Both are their own Base UI modules
   now, so the toolbar composes the symbols through `render` and keeps its
   roving focus: the strip is still one tab stop. ToolbarButton's `variant`
   widens to the full eight with them. */
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
  variant?: ButtonVariant
  size?: ButtonSize
}) {
  return (
    <ToolbarPrimitive.Button
      data-slot="toolbar-button"
      render={<Button variant={variant} size={size} />}
      className={bcx("ds-toolbar-button", className)}
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
      render={<Input />}
      className={bcx("ds-toolbar-input", className)}
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
