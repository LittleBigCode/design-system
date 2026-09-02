import { Field, FieldLabel } from "@diametral/ui/components/field"
import { Slider } from "@diametral/ui/components/slider"

export default function SliderBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <Field>
        <FieldLabel id="slider-basic-opacity-label">Opacity</FieldLabel>
        <Slider
          defaultValue={60}
          aria-labelledby="slider-basic-opacity-label"
        />
      </Field>
      <Field>
        <FieldLabel id="slider-basic-disabled-label">Disabled</FieldLabel>
        <Slider
          defaultValue={25}
          disabled
          aria-labelledby="slider-basic-disabled-label"
        />
      </Field>
    </div>
  )
}
