"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"

import { cx, type WithClassName } from "../lib/cx.js"
import { Button } from "./button.js"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group.js"
import { CaretDownIcon, XIcon, CheckIcon } from "@phosphor-icons/react"

const Combobox = ComboboxPrimitive.Root

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxTrigger({
  className,
  children,
  "aria-label": ariaLabel = "Toggle options",
  ...props
}: WithClassName<ComboboxPrimitive.Trigger.Props>) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      aria-label={ariaLabel}
      className={cx("ds-combobox-trigger", className)}
      {...props}
    >
      {children}
      <CaretDownIcon className="ds-combobox-trigger-icon" />
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({
  className,
  "aria-label": ariaLabel = "Clear",
  ...props
}: WithClassName<ComboboxPrimitive.Clear.Props>) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      aria-label={ariaLabel}
      className={cx(className)}
      {...props}
    >
      <XIcon className="ds-combobox-clear-icon" />
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: WithClassName<ComboboxPrimitive.Input.Props> & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <InputGroup className={cx("w-auto", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            className="ds-combobox-input-trigger"
            disabled={disabled}
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  )
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: WithClassName<ComboboxPrimitive.Popup.Props> &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="ds-combobox-positioner"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cx("ds-combobox-content", className)}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: WithClassName<ComboboxPrimitive.List.Props>) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cx("ds-combobox-list", className)}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: WithClassName<ComboboxPrimitive.Item.Props>) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cx("ds-combobox-item", className)}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={<span className="ds-combobox-item-indicator" />}
      >
        <CheckIcon />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: WithClassName<ComboboxPrimitive.Group.Props>) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cx(className)}
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  ...props
}: WithClassName<ComboboxPrimitive.GroupLabel.Props>) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cx("ds-combobox-label", className)}
      {...props}
    />
  )
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
}

function ComboboxEmpty({ className, ...props }: WithClassName<ComboboxPrimitive.Empty.Props>) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cx("ds-combobox-empty", className)}
      {...props}
    />
  )
}

function ComboboxSeparator({
  className,
  ...props
}: WithClassName<ComboboxPrimitive.Separator.Props>) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cx("ds-combobox-separator", className)}
      {...props}
    />
  )
}

function ComboboxChips({
  className,
  ...props
}: WithClassName<React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips>> &
  WithClassName<ComboboxPrimitive.Chips.Props>) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cx("ds-combobox-chips", className)}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: WithClassName<ComboboxPrimitive.Chip.Props> & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cx("ds-combobox-chip", className)}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-xs" />}
          className="ds-combobox-chip-remove"
          data-slot="combobox-chip-remove"
          aria-label={
            typeof children === "string" ? `Remove ${children}` : "Remove"
          }
        >
          <XIcon className="ds-combobox-chip-remove-icon" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({
  className,
  ...props
}: WithClassName<ComboboxPrimitive.Input.Props>) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cx("ds-combobox-chip-input", className)}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
