import { Gauge } from "@diametral/ui/components/gauge"

// The panel hands every control through as a string, so the numeric props are
// converted into one bag above the JSX — the code strip only reprints the
// element carrying `{...props}`, so a conversion written inline would be
// printed as source instead of as the value it produced.
export default function GaugePlayground({
  value = "62",
  max,
  ...rest
}: {
  value?: string
  max?: string
  label?: string
}) {
  const props = {
    ...rest,
    value: Number(value),
    ...(max ? { max: Number(max) } : {}),
  }

  return <Gauge size={160} {...props} />
}
