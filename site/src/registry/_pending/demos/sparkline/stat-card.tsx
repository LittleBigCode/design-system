import { Sparkline } from "@diametral/ui/components/sparkline"
import {
  StatCard,
  StatCardDelta,
  StatCardLabel,
  StatCardSpark,
  StatCardValue,
} from "@diametral/ui/components/stat-card"

const SIGNUPS = [180, 204, 197, 240, 232, 288, 301, 342]

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
