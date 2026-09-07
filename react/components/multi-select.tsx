"use client"

import * as React from "react"

import { useControllableValue } from "../hooks/useControllableValue.js"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "./combobox.js"

type MultiSelectOption = {
  value: string
  label: string
}

// A friendlier `options` / `value` API over Combobox's `multiple` + chips mode,
// which already carries the accessible chip-remove and filtering behavior —
// this just saves every consumer from re-deriving the ComboboxValue/anchor wiring
// the combobox/multiple demo shows by hand.
function MultiSelect({
  className,
  options,
  value,
  defaultValue = [],
  onValueChange,
  placeholder = "Select…",
  emptyText = "No results found.",
  disabled = false,
  // The chips input is the form control that needs the name — a label on the
  // Combobox root doesn't reach it, so these are declared here and routed down.
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: {
  options: MultiSelectOption[]
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  emptyText?: string
  disabled?: boolean
  className?: string
  "aria-label"?: string
  "aria-labelledby"?: string
}) {
  const [selected, setSelected] = useControllableValue<string[]>({
    value,
    defaultValue,
    onChange: onValueChange,
  })

  const labels = React.useMemo(
    () => new Map(options.map((option) => [option.value, option.label])),
    [options]
  )

  // The popup anchors to the chips row (not the combobox root) so it tracks the
  // row as chips wrap onto a second line — see the combobox/multiple demo.
  const anchor = useComboboxAnchor()

  return (
    <Combobox
      items={options}
      multiple
      value={selected}
      onValueChange={setSelected}
      disabled={disabled}
    >
      <ComboboxChips
        ref={anchor}
        data-slot="multi-select"
        className={className}
      >
        <ComboboxValue>
          {(values: string[]) =>
            values.map((item) => (
              <ComboboxChip key={item}>{labels.get(item) ?? item}</ComboboxChip>
            ))
          }
        </ComboboxValue>
        <ComboboxChipsInput
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          placeholder={selected.length === 0 ? placeholder : undefined}
        />
      </ComboboxChips>
      <ComboboxContent data-slot="multi-select-content" anchor={anchor}>
        <ComboboxEmpty>{emptyText}</ComboboxEmpty>
        <ComboboxList>
          {(option: MultiSelectOption) => (
            <ComboboxItem key={option.value} value={option.value}>
              {option.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export { MultiSelect }
export type { MultiSelectOption }
