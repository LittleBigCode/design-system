import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHead,
} from "@diametral/design-system/react"

const SNIPPET = `import { StatCard, StatCardDelta, StatCardLabel, StatCardValue } from "@diametral/design-system/react"

const METRICS = [
  { label: "Revenue", value: "84 200 €", delta: "+12.4%", direction: "up" },
  { label: "Churn", value: "3.1%", delta: "-0.6pt", direction: "down" },
  { label: "Signups", value: "1 284", delta: "+8.0%", direction: "up" },
] as const

export function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {METRICS.map((metric) => (
        <StatCard key={metric.label}>
          <StatCardLabel>{metric.label}</StatCardLabel>
          <StatCardValue>{metric.value}</StatCardValue>
          <StatCardDelta direction={metric.direction}>
            {metric.delta}
          </StatCardDelta>
        </StatCard>
      ))}
    </div>
  )
}`

export default function CodeBlockScrollable() {
  return (
    <CodeBlock className="w-full max-w-lg">
      <CodeBlockHead>
        <CodeBlockFilename>dashboard.tsx</CodeBlockFilename>
        <CodeBlockCopyButton value={SNIPPET} />
      </CodeBlockHead>
      <CodeBlockBody
        code={SNIPPET}
        className="max-h-56"
        tabIndex={0}
        aria-label="dashboard.tsx source"
      />
    </CodeBlock>
  )
}
