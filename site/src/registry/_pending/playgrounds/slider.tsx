import type { ComponentProps } from "react"

import { Slider } from "@diametral/ui/components/slider"

// Panel values arrive as strings, so `step` is coerced here rather than on the
// element — anything written on the `{...props}` element is dropped from the
// generated snippet, which would leave preview and code disagreeing.
export default function SliderPlayground({
  step,
  ...rest
}: Omit<ComponentProps<typeof Slider>, "step"> & { step?: string }) {
  const props = {
    ...rest,
    ...(step ? { step: Number(step) } : {}),
  }

  return (
    <div className="flex h-40 w-full max-w-xs items-center justify-center">
      <span id="slider-playground-label" className="sr-only">
        Slider preview
      </span>
      <Slider aria-labelledby="slider-playground-label" {...props} />
    </div>
  )
}
