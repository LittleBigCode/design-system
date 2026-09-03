"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react"

import { bcx } from "../lib/baseClass.js"

/* Select — a value picked from a list, as a composed popup.
   ---------------------------------------------------------------------------
   0.11's `Select` wrapped a native `<select>` and took an `options` array. What
   the parts buy is what a native select cannot render at all: a group label, a
   separator, an icon or a badge inside a row, and a checked indicator. That is
   composition replacing configuration, the trade every applier in this
   migration makes.

   `.ds-select` — the native wrapper — is **preserved** in `select.css`. Three
   committed fixtures render it as bare HTML, `docs/for-claude.md` teaches it,
   and a native select is still the right answer on a hand-written form. The two
   grammars do not collide: a `.` selector does not bleed across the hyphen into
   `.ds-select-trigger`.

   Carries **2 of the 18 `z-index: 50` remaps** — the positioner and the popup,
   both onto `--ds-z-popover`.

   One a11y fix travels with the trigger and is worth naming: `role="combobox"`
   is not name-from-content, so the visible `SelectValue` text is not
   automatically the trigger's accessible name. The trigger points
   `aria-labelledby` at it unless the caller supplies a name of their own.

   Recipe for rebuilding the `options` array is in
   `docs/migration/from-0.11.md`. */

const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={bcx("ds-select-group", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={bcx("ds-select-value", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: SelectPrimitive.Trigger.Props & { size?: "sm" | "default" }) {
  const valueId = React.useId()
  const labelledBy = ariaLabel || ariaLabelledBy ? ariaLabelledBy : valueId

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      aria-label={ariaLabel}
      aria-labelledby={labelledBy}
      className={bcx("ds-select-trigger", className)}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) && child.type === SelectValue
          ? React.cloneElement(child as React.ReactElement<{ id?: string }>, {
              id: valueId,
            })
          : child
      )}
      <SelectPrimitive.Icon
        render={<CaretDownIcon className="ds-select-trigger-icon" />}
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="ds-select-positioner"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={bcx("ds-select-content", className)}
          {...props}
        >
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={bcx("ds-select-label", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={bcx("ds-select-item", className)}
      {...props}
    >
      <SelectPrimitive.ItemText className="ds-select-item-text">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={<span className="ds-select-item-indicator" />}
      >
        <CheckIcon className="ds-select-item-indicator-icon" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={bcx("ds-select-separator", className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
