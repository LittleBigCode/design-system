import {
  StatCard,
  StatCardLabel,
  StatCardValue,
} from "@diametral/ui/components/stat-card"

export default function StatCardBasic() {
  return (
    <div className="flex flex-wrap gap-4">
      <StatCard className="w-48">
        <StatCardLabel>Active projects</StatCardLabel>
        <StatCardValue>128</StatCardValue>
      </StatCard>
      <StatCard className="w-48">
        <StatCardLabel>Team members</StatCardLabel>
        <StatCardValue>24</StatCardValue>
      </StatCard>
    </div>
  )
}
