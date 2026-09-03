import {
  Card,
  CardBlock,
  CardHeader,
  CardTitle,
} from "@diametral/design-system/react"

const LINES = [
  { label: "Plan", value: "Studio, annual" },
  { label: "Seats", value: "12 of 20" },
  { label: "Renews", value: "14 March 2027" },
]

export default function CardBlocks() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader ruled>
        <CardTitle>Subscription</CardTitle>
      </CardHeader>
      {LINES.map((line) => (
        <CardBlock
          key={line.label}
          className="flex items-center justify-between gap-4"
        >
          <span className="text-sm text-muted-foreground">{line.label}</span>
          <span className="text-sm">{line.value}</span>
        </CardBlock>
      ))}
    </Card>
  )
}
