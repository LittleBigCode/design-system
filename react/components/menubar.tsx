"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"
import { CaretRightIcon, CheckIcon } from "@phosphor-icons/react"

import { bcx } from "../lib/baseClass.js"
import { cx } from "../lib/cx.js"

/* Menubar — a horizontal bar of menus, each with submenus, checkbox and radio
   rows. The source routed twelve of these sixteen parts through its own
   `dropdown-menu`, which holds: this repo's incumbent is `Dropdown`, and it is
   click-toggled with no submenus, no checkbox or radio rows and no positioning
   props — which is exactly why the react-ledger withdrew the `MenuItem` alias.
   So the re-wiring goes to Base UI's `Menu`, the primitive the source's own
   dropdown-menu wraps, and to this repo's `.ds-menu*` vocabulary for the
   surfaces it already has a shape for. All sixteen exports survive. */

function Menubar({ className, ...props }: MenubarPrimitive.Props) {
  return (
    <MenubarPrimitive
      data-slot="menubar"
      className={bcx("ds-menubar", className)}
      {...props}
    />
  )
}

function MenubarMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root {...props} />
}

function MenubarGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="menubar-portal" {...props} />
}

function MenubarTrigger({
  className,
  ...props
}: MenuPrimitive.Trigger.Props) {
  return (
    <MenuPrimitive.Trigger
      data-slot="menubar-trigger"
      className={bcx("ds-menubar-trigger", className)}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  side = "bottom",
  sideOffset = 8,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="menubar-content"
          className={bcx("ds-menu", className)}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={bcx(
        cx("ds-menu__item", variant === "destructive" && "ds-menu__item--danger"),
        className,
      )}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      data-inset={inset}
      className={bcx("ds-menu__item ds-menubar-checkbox-item", className)}
      checked={checked}
      {...props}
    >
      <span
        className="ds-menubar-item-indicator"
        data-slot="menubar-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function MenubarRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  )
}

function MenubarRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="menubar-radio-item"
      data-inset={inset}
      className={bcx("ds-menu__item ds-menubar-radio-item", className)}
      {...props}
    >
      <span
        className="ds-menubar-item-indicator"
        data-slot="menubar-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="menubar-label"
      data-inset={inset}
      className={bcx("ds-menu__header", className)}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="menubar-separator"
      className={bcx("ds-menu__divider", className)}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cx("ds-menubar-shortcut", className)}
      {...props}
    />
  )
}

function MenubarSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={bcx("ds-menu__item ds-menubar-sub-trigger", className)}
      {...props}
    >
      {children}
      {/* The caret came from the source dropdown-menu's own sub-trigger, which
          does not land — without it a submenu row looks like a plain item. */}
      <CaretRightIcon className="ds-menubar-sub-trigger-icon" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

/* The `min-w-32` dedupe exception is resolved rather than carried: it was a
   literal kept so tailwind-merge could dedupe it against the source
   dropdown-menu's own `min-w-36`, and `.ds-menu` sets a min-width of its own. */
function MenubarSubContent({
  ...props
}: React.ComponentProps<typeof MenubarContent>) {
  return (
    <MenubarContent
      data-slot="menubar-sub-content"
      side="inline-end"
      alignOffset={-4}
      sideOffset={0}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
