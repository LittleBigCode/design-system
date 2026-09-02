import {
  StatCard,
  StatCardLabel,
  StatCardSpark,
  StatCardValue,
} from "@diametral/ui/components/stat-card"

const POINTS = [4, 7, 6, 9, 8, 12, 11, 15]

export default function StatCardWithSpark() {
  const max = Math.max(...POINTS)
  const path = POINTS.map(
    (v, i) => `${(i / (POINTS.length - 1)) * 100},${20 - (v / max) * 20}`
  ).join(" ")

  return (
    <StatCard className="w-48">
      <StatCardLabel>Signups</StatCardLabel>
      <StatCardValue>1 284</StatCardValue>
      <StatCardSpark>
        <svg viewBox="0 0 100 20" className="h-6 w-full" aria-hidden="true">
          <polyline
            points={path}
            fill="none"
            stroke="var(--ds-chart-1)"
            strokeWidth={2}
          />
        </svg>
      </StatCardSpark>
    </StatCard>
  )
}
