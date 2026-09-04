import { Sparkline, StatCard } from "@diametral/design-system/react"

const SIGNUPS = [180, 204, 197, 240, 232, 288, 301, 342]

/* `StatCard`'s compound parts are batch 6: this package's incumbent takes the
   label, figure and delta as props and renders whatever it is given as
   children into the spark slot, which is the same composition in one element.
   `aria-hidden` on the sparkline is what stops a screen reader reading a
   decorative trend twice — the figure above it already says the number. */
export default function SparklineStatCard() {
  return (
    <StatCard
      className="w-60"
      label="Signups this week"
      value="342"
      delta="+13.6%"
      deltaDir="up"
    >
      <Sparkline
        data={SIGNUPS}
        stroke="var(--ds-chart-3)"
        fill
        showDot
        animate
        width={200}
        height={28}
        aria-hidden
      />
    </StatCard>
  )
}
