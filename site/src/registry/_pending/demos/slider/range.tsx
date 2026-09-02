import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"
import { Slider } from "@diametral/ui/components/slider"

export default function SliderRange() {
  const [budget, setBudget] = React.useState([20, 70])

  return (
    <Field className="w-full max-w-sm">
      <FieldLabel id="slider-range-budget-label">
        Budget — {budget[0]}k to {budget[1]}k €
      </FieldLabel>
      <Slider
        value={budget}
        onValueChange={(value) => setBudget(value as number[])}
        aria-labelledby="slider-range-budget-label"
      />
      <FieldDescription>Projects outside the band are hidden.</FieldDescription>
    </Field>
  )
}
