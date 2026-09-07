import {
  PageHeader,
  StatCard,
  StatCardDelta,
  StatCardLabel,
  StatCardSpark,
  StatCardValue,
  Sparkline,
  Card,
  AreaChart,
} from "@diametral/design-system/react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const REVENUE = [12, 19, 14, 23, 28, 26, 34, 41];
const SIGNUPS = [4, 6, 5, 9, 8, 12, 14, 18];

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="A snapshot of how the workspace is doing."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <StatCard>
          <StatCardLabel>Revenue</StatCardLabel>
          <StatCardValue>€41k</StatCardValue>
          <StatCardDelta direction="up">+18%</StatCardDelta>
          <StatCardSpark>
            <Sparkline data={REVENUE} fill />
          </StatCardSpark>
        </StatCard>
        <StatCard>
          <StatCardLabel>Sign-ups</StatCardLabel>
          <StatCardValue>1,284</StatCardValue>
          <StatCardDelta direction="up">+9%</StatCardDelta>
          <StatCardSpark>
            <Sparkline data={SIGNUPS} fill />
          </StatCardSpark>
        </StatCard>
        <StatCard>
          <StatCardLabel>Active items</StatCardLabel>
          <StatCardValue>128</StatCardValue>
          <StatCardDelta direction="down">-3%</StatCardDelta>
        </StatCard>
        <StatCard>
          <StatCardLabel>Churn</StatCardLabel>
          <StatCardValue>2.4%</StatCardValue>
          <StatCardDelta direction="up">-0.5pt</StatCardDelta>
        </StatCard>
      </div>

      <Card title="Revenue vs. sign-ups">
        <AreaChart
          width={760}
          height={240}
          labels={MONTHS}
          series={[
            { name: "Revenue", data: REVENUE },
            { name: "Sign-ups", data: SIGNUPS },
          ]}
          style={{ width: "100%" }}
        />
      </Card>
    </>
  );
}
