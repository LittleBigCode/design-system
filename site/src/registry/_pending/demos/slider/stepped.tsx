import * as React from "react"

import { Field, FieldLabel } from "@diametral/ui/components/field"
import { Slider } from "@diametral/ui/components/slider"

const LEVELS = ["None", "Fast", "Balanced", "Small", "Smallest"]

export default function SliderStepped() {
  const [level, setLevel] = React.useState(2)

  return (
    <Field className="w-full max-w-sm">
      <FieldLabel id="slider-stepped-label">
        Compression — {LEVELS[level]}
      </FieldLabel>
      <Slider
        value={level}
        min={0}
        max={LEVELS.length - 1}
        step={1}
        onValueChange={(value) => setLevel(value as number)}
        aria-labelledby="slider-stepped-label"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        {LEVELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </Field>
  )
}
