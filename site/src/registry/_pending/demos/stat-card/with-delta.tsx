import {
  StatCard,
  StatCardDelta,
  StatCardLabel,
  StatCardValue,
} from "@diametral/ui/components/stat-card"

export default function StatCardWithDelta() {
  return (
    <div className="flex flex-wrap gap-4">
      <StatCard className="w-48">
        <StatCardLabel>Revenue</StatCardLabel>
        <StatCardValue>84 200 €</StatCardValue>
        <StatCardDelta direction="up">+12.4%</StatCardDelta>
      </StatCard>
      <StatCard className="w-48">
        <StatCardLabel>Churn</StatCardLabel>
        <StatCardValue>3.1%</StatCardValue>
        <StatCardDelta direction="down">-0.6pt</StatCardDelta>
      </StatCard>
    </div>
  )
}
