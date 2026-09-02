import { Badge } from "@diametral/ui/components/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@diametral/ui/components/card"

const STATS = [
  { label: "Components", value: "73", delta: "+13" },
  { label: "Tokens", value: "48", delta: "+6" },
]

export default function CardStat() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      {STATS.map((stat) => (
        <Card key={stat.label}>
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {stat.value}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">{stat.delta} this quarter</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
