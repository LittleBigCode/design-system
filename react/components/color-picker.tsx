"use client"

import * as React from "react"

import { useControllableValue } from "../hooks/useControllableValue.js"
import { cx } from "../lib/cx.js"
import { Input } from "./input.js"

/** Tier-1 brand primaries and secondaries, plus white. */
const BRAND_SWATCHES = [
  "#161616",
  "#767884",
  "#9f8667",
  "#aab0a6",
  "#d5d3c4",
  "#f4fbda",
  "#ff2a00",
  "#23e2ff",
  "#89fc79",
  "#fff73b",
  "#ffffff",
]

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

/** Lowercase #rrggbb, so `#FFF` and `#ffffff` compare equal. */
function normHex(input: string) {
  const value = input.trim().toLowerCase()
  if (!HEX.test(value)) return value
  return value.length === 4
    ? `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`
    : value
}

// A swatch grid, a hex field and the native colour input, all converging on one
// value — ported from v1's ColorPicker (react/components/ColorPicker.js,
// css/components/color-picker.css). Controlled with `value`, uncontrolled with
// `defaultValue`.
//
// One deviation from v1: `name` goes to a hidden input carrying the committed
// value rather than to the visible hex field. v1 submitted whatever was typed,
// so a form could post `#16` mid-edit; the hidden input only ever holds a
// parsed colour.
function ColorPicker({
  className,
  value,
  defaultValue = "#161616",
  onChange,
  swatches = BRAND_SWATCHES,
  disabled,
  name,
  "aria-label": ariaLabel = "Colour",
  ...props
}: Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> & {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  swatches?: string[]
  disabled?: boolean
  name?: string
}) {
  const [current, setCurrent] = useControllableValue<string>({
    value,
    defaultValue,
    onChange,
  })

  // Draft text, so the field can hold "#16" mid-type without forcing a value.
  // It resyncs whenever the committed colour changes from anywhere.
  const [draft, setDraft] = React.useState(current)
  React.useEffect(() => setDraft(current), [current])

  const selected = normHex(current)

  return (
    <div
      data-slot="color-picker"
      role="group"
      aria-label={ariaLabel}
      className={cx("ds-color-picker", className)}
      {...props}
    >
      <div
        data-slot="color-picker-swatches"
        role="group"
        aria-label="Swatches"
        className="ds-color-picker-swatches"
      >
        {swatches.map((swatch) => {
          const norm = normHex(swatch)
          const isSelected = norm === selected
          return (
            <button
              key={swatch}
              type="button"
              data-slot="color-picker-swatch"
              disabled={disabled}
              aria-pressed={isSelected}
              aria-label={swatch}
              title={swatch}
              style={{ background: swatch }}
              onClick={() => setCurrent(norm)}
              className={cx("ds-color-picker-swatch")}
            />
          )
        })}
      </div>

      <div className="ds-color-picker-row">
        <Input
          value={draft}
          placeholder="#000000"
          spellCheck={false}
          autoComplete="off"
          disabled={disabled}
          aria-label="Hex colour"
          onChange={(event) => {
            const raw = event.target.value
            setDraft(raw)
            const candidate = raw.startsWith("#") ? raw : `#${raw}`
            if (HEX.test(candidate)) setCurrent(normHex(candidate))
          }}
          onBlur={() => setDraft(current)}
        />
        <input
          type="color"
          data-slot="color-picker-native"
          value={HEX.test(current) ? normHex(current) : "#000000"}
          disabled={disabled}
          aria-label="Pick a colour"
          onChange={(event) => setCurrent(normHex(event.target.value))}
          className="ds-color-picker-native"
        />
      </div>

      {name ? <input type="hidden" name={name} value={current} /> : null}
    </div>
  )
}

export { ColorPicker, BRAND_SWATCHES }
