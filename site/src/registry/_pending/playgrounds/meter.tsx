import { Meter, MeterLabel, MeterValue } from "@diametral/ui/components/meter"

// `value` is what a meter *is*, so it is declared `always` — a snippet that
// omitted it would render an empty track.
export default function MeterPlayground({
  value = "68",
  max,
  ...rest
}: {
  value?: string
  max?: string
}) {
  const props = {
    ...rest,
    value: Number(value),
    ...(max ? { max: Number(max) } : {}),
  }

  return (
    <Meter className="w-full max-w-3xs" {...props}>
      <MeterLabel>Storage used</MeterLabel>
      <MeterValue />
    </Meter>
  )
}
