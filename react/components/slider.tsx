"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { bcx } from "../lib/baseClass.js"

/* Slider — a value, or a range, picked along a track.
   ---------------------------------------------------------------------------
   Replaces 0.11's `Range`, which wrapped a native `<input type=range>`. What
   Base UI buys is the part a native range cannot do at all: **more than one
   thumb**, so a min/max range is one control rather than two inputs a caller
   has to keep ordered. It also buys a vertical orientation and a thumb that can
   be labelled.

   `.ds-range` does not go away. `slider.css` keeps it, for the reason
   `spinner.css` kept its drawn ring in beta.6: two committed fixtures render it
   as bare HTML and no component on either side would re-class them — and a
   native range is still the right answer on a hand-written form.

   The export is renamed `Range` -> `Slider`, which also retires a collision with
   the DOM's own `Range`. Recipe in `docs/migration/from-0.11.md`. */
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  "aria-label": ariaLabel,
  ...props
}: SliderPrimitive.Root.Props) {
  const values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [(value ?? defaultValue ?? min) as number]

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={bcx("ds-slider", className)}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="ds-slider-control">
        <SliderPrimitive.Track data-slot="slider-track" className="ds-slider-track">
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="ds-slider-range"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="ds-slider-thumb"
            /* A caller's `aria-label` has to reach the real
               `<input type="range">` Thumb renders internally — Root is just
               the outer div, and an `id` left there for a sibling
               `Label htmlFor` labels that div, not the input inside it (axe,
               `label`, #50). `aria-label` is a Thumb-level prop precisely
               because it's the input's own attribute. Only applied for the
               single-thumb case: a range's two thumbs need one name each,
               which this wrapper does not expose per-thumb. */
            aria-label={values.length === 1 ? ariaLabel : undefined}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
