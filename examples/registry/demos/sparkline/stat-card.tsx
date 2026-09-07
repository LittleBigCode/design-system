import {
  Sparkline,
  StatCard,
  StatCardDelta,
  StatCardLabel,
  StatCardSpark,
  StatCardValue,
} from "@diametral/design-system/react"

const SIGNUPS = [180, 204, 197, 240, 232, 288, 301, 342]

/* `aria-hidden` on the sparkline is what stops a screen reader reading a
   decorative trend twice — the figure above it already says the number. */
export default function SparklineStatCard() {
  return (
    <StatCard className="w-60">
      <StatCardLabel>Signups this week</StatCardLabel>
      <StatCardValue>342</StatCardValue>
      <StatCardDelta direction="up">+13.6%</StatCardDelta>
      <StatCardSpark>
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
      </StatCardSpark>
    </StatCard>
  )
}
