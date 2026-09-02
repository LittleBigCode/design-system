import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@diametral/ui/components/progress"

// `value` is declared `always` for the same reason as Meter's. Note the panel
// cannot express the indeterminate state, which is `value={null}` rather than a
// number — see the Indeterminate example below.
export default function ProgressPlayground({
  value = "72",
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
    <Progress className="w-full max-w-3xs" {...props}>
      <ProgressLabel>Uploading</ProgressLabel>
      <ProgressValue />
    </Progress>
  )
}
