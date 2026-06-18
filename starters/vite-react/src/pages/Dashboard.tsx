import {
  PageHeader,
  StatCard,
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
        <StatCard label="Revenue" value="€41k" delta="+18%" deltaDir="up">
          <Sparkline data={REVENUE} fill />
        </StatCard>
        <StatCard label="Sign-ups" value="1,284" delta="+9%" deltaDir="up">
          <Sparkline data={SIGNUPS} fill />
        </StatCard>
        <StatCard label="Active items" value="128" delta="-3%" deltaDir="down" />
        <StatCard label="Churn" value="2.4%" delta="-0.5pt" deltaDir="up" />
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
