import { Sparkline } from "@diametral/ui/components/sparkline"

// `data` is a number[], which no panel control can produce without printing a
// quoted string into the code strip — so the series is a literal here and the
// snippet stays copy-pasteable.
export default function SparklinePlayground({
  stroke,
  ...rest
}: {
  stroke?: string
  fill?: boolean
  showDot?: boolean
  animate?: boolean
}) {
  const props = {
    ...rest,
    // The panel's first option is the em dash, meaning "stay on currentColor".
    ...(stroke && stroke !== "—" ? { stroke } : {}),
  }

  return (
    <Sparkline
      data={[12, 18, 15, 24, 20, 32, 28, 36]}
      width={220}
      height={48}
      {...props}
    />
  )
}
