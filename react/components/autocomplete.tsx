"use client"

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete"

import { XIcon } from "@phosphor-icons/react"

import { InputGroup } from "./InputGroup.js"
import { IconButton } from "./icon-button.js"
import { bcx } from "../lib/baseClass.js"

const Autocomplete = AutocompletePrimitive.Root

/* Re-wired onto `IconButton` — the source's `InputGroupButton` has no
   counterpart here, and batch 7 re-wires it back. `sm` rather than the
   source's `icon-xs`: 30px is the smallest square the incumbent has, and it
   still clears the 40px control it sits beside. */
function AutocompleteClear({
  className,
  ...props
}: AutocompletePrimitive.Clear.Props) {
  return (
    <AutocompletePrimitive.Clear
      data-slot="autocomplete-clear"
      render={<IconButton label="Clear" size="sm" />}
      className={className}
      {...props}
    >
      <XIcon className="ds-autocomplete-clear-icon" />
    </AutocompletePrimitive.Clear>
  )
}

/* Re-wired onto the incumbent `InputGroup`, whose addon is the `after` slot
   rather than a child component, and onto `Input` for the control. The
   source's `w-auto` literal is gone with it: `.ds-input-group` is already
   `inline-flex`, so it sizes to its content without help. */
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
    <InputGroup
      className={typeof className === "string" ? className : undefined}
      after={showClear ? <AutocompleteClear disabled={disabled} /> : undefined}
    >
      <AutocompletePrimitive.Input
        render={<input className="ds-input" disabled={disabled} />}
        {...props}
      />
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
