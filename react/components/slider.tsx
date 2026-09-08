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
   the DOM's own `Range`. Recipe in `docs/migration/from-0.11.md`.

   A single-thumb Slider can't be labelled the way Checkbox/RadioGroupItem are
   (`id` + sibling `<FieldLabel htmlFor>`): the focusable element is the native
   `<input>` nested inside `Thumb`, two levels below `Root`, and Base UI never
   routes `Root`'s `id` down to it. `aria-label`/`aria-labelledby` are the only
   props Base UI actually applies to that `<input>`, so they're read off here
   and forwarded to the thumb explicitly — only for the single-thumb case, since
   a range slider's two thumbs each need their own name regardless. */
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: SliderPrimitive.Root.Props) {
  const values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [(value ?? defaultValue ?? min) as number]
  const singleThumb = values.length === 1

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={bcx("ds-slider", className)}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      aria-labelledby={ariaLabelledBy}
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
            aria-label={singleThumb ? ariaLabel : undefined}
            aria-labelledby={singleThumb ? ariaLabelledBy : undefined}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
