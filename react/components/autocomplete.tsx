"use client"

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete"

import { XIcon } from "@phosphor-icons/react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group.js"
import { bcx } from "../lib/baseClass.js"

const Autocomplete = AutocompletePrimitive.Root

/* Re-wired back onto `InputGroupButton` in 1.0.0-beta.7, the second and final
   half of batch 1's forward cross-batch import. It was `IconButton size="sm"`
   while the source's own input-group held; the size is `icon-xs` again, which
   is the 24px square the addon was designed around. */
function AutocompleteClear({
  className,
  ...props
}: AutocompletePrimitive.Clear.Props) {
  return (
    <AutocompletePrimitive.Clear
      data-slot="autocomplete-clear"
      render={<InputGroupButton aria-label="Clear" size="icon-xs" />}
      className={className}
      {...props}
    >
      <XIcon className="ds-autocomplete-clear-icon" />
    </AutocompletePrimitive.Clear>
  )
}

/* Re-wired back onto the absorbed `InputGroup` in 1.0.0-beta.7. The addon is a
   child part again rather than the incumbent's `after` prop, and the control is
   `InputGroupInput`, so the group draws the box and the input drops its own —
   which is what makes the clear button sit *inside* the field rather than
   welded to its edge. */
function AutocompleteInput({
  className,
  children,
  disabled = false,
  showClear = false,
  ...props
}: AutocompletePrimitive.Input.Props & {
  showClear?: boolean
}) {
  return (
    <InputGroup className={typeof className === "string" ? className : undefined}>
      <AutocompletePrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      {showClear ? (
        <InputGroupAddon align="inline-end">
          <AutocompleteClear disabled={disabled} />
        </InputGroupAddon>
      ) : null}
      {children}
    </InputGroup>
  )
}

function AutocompleteContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  ...props
}: AutocompletePrimitive.Popup.Props &
  Pick<
    AutocompletePrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset"
  >) {
  return (
    <AutocompletePrimitive.Portal>
      <AutocompletePrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className="ds-autocomplete-positioner"
      >
        <AutocompletePrimitive.Popup
          data-slot="autocomplete-content"
          className={bcx("ds-autocomplete-content", className)}
          {...props}
        />
      </AutocompletePrimitive.Positioner>
    </AutocompletePrimitive.Portal>
  )
}

function AutocompleteList({
  className,
  ...props
}: AutocompletePrimitive.List.Props) {
  return (
    <AutocompletePrimitive.List
      data-slot="autocomplete-list"
      className={bcx("ds-autocomplete-list", className)}
      {...props}
    />
  )
}

function AutocompleteItem({
  className,
  ...props
}: AutocompletePrimitive.Item.Props) {
  return (
    <AutocompletePrimitive.Item
      data-slot="autocomplete-item"
      className={bcx("ds-autocomplete-item", className)}
      {...props}
    />
  )
}

function AutocompleteGroup({
  className,
  ...props
}: AutocompletePrimitive.Group.Props) {
  return (
    <AutocompletePrimitive.Group
      data-slot="autocomplete-group"
      className={className}
      {...props}
    />
  )
}

function AutocompleteLabel({
  className,
  ...props
}: AutocompletePrimitive.GroupLabel.Props) {
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot="autocomplete-label"
      className={bcx("ds-autocomplete-label", className)}
      {...props}
    />
  )
}

function AutocompleteCollection({
  ...props
}: AutocompletePrimitive.Collection.Props) {
  return (
    <AutocompletePrimitive.Collection
      data-slot="autocomplete-collection"
      {...props}
    />
  )
}

function AutocompleteEmpty({
  className,
  ...props
}: AutocompletePrimitive.Empty.Props) {
  return (
    <AutocompletePrimitive.Empty
      data-slot="autocomplete-empty"
      className={bcx("ds-autocomplete-empty", className)}
      {...props}
    />
  )
}

function AutocompleteStatus({
  className,
  ...props
}: AutocompletePrimitive.Status.Props) {
  return (
    <AutocompletePrimitive.Status
      data-slot="autocomplete-status"
      className={bcx("ds-autocomplete-status", className)}
      {...props}
    />
  )
}

function AutocompleteSeparator({
  className,
  ...props
}: AutocompletePrimitive.Separator.Props) {
  return (
    <AutocompletePrimitive.Separator
      data-slot="autocomplete-separator"
      className={bcx("ds-autocomplete-separator", className)}
      {...props}
    />
  )
}

export {
  Autocomplete,
  AutocompleteInput,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteGroup,
  AutocompleteLabel,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteStatus,
  AutocompleteSeparator,
}
