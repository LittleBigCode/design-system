"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cx, type WithClassName } from "../lib/cx.js"
import { StarIcon } from "@phosphor-icons/react"

function Rating({
  className,
  max = 5,
  shape = "default",
  value,
  defaultValue = 0,
  onValueChange,
  readOnly = false,
  disabled = false,
  ...props
}: Omit<
  WithClassName<RadioGroupPrimitive.Props>,
  "value" | "defaultValue" | "onValueChange"
> & {
  max?: number
  shape?: "default" | "star"
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  readOnly?: boolean
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const [hovered, setHovered] = React.useState<number | null>(null)

  const selected = value ?? uncontrolled
  const shown = hovered ?? selected
  const interactive = !readOnly && !disabled

  return (
    <RadioGroupPrimitive
      data-slot="rating"
      value={selected}
      disabled={disabled}
      onValueChange={(next) => {
        if (value === undefined) {
          setUncontrolled(next as number)
        }
        onValueChange?.(next as number)
      }}
      onMouseLeave={() => setHovered(null)}
      className={cx(
        "ds-rating",
        shape === "star" ? "ds-rating--star" : "ds-rating--default",
        className
      )}
      {...props}
    >
      {Array.from({ length: max }, (_, index) => {
        const rank = index + 1

        return (
          <RadioPrimitive.Root
            key={rank}
            data-slot="rating-item"
            data-shape={shape}
            value={rank}
            disabled={!interactive}
            aria-label={String(rank)}
            onMouseEnter={interactive ? () => setHovered(rank) : undefined}
            className={cx(
              "ds-rating-item",
              rank <= shown && "ds-rating-item--active",
              interactive && shape !== "star" && "ds-rating-item--hover-lift",
              interactive ? "ds-rating-item--interactive" : "ds-rating-item--disabled"
            )}
          >
            {shape === "star" && (
              <StarIcon
                className="ds-rating-star-icon"
                weight={rank <= shown ? "fill" : "regular"}
              />
            )}
          </RadioPrimitive.Root>
        )
      })}
    </RadioGroupPrimitive>
  )
}

export { Rating }
