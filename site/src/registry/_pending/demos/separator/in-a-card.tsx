import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@diametral/ui/components/card"
import { Separator } from "@diametral/ui/components/separator"

export default function SeparatorInACard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>Team plan, billed yearly.</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex items-baseline justify-between">
        <span className="text-muted-foreground">Next invoice</span>
        <span className="tabular-nums">€1,248.00</span>
      </CardContent>
      <Separator />
      <CardContent className="flex items-baseline justify-between">
        <span className="text-muted-foreground">Payment method</span>
        <span>Visa ···· 4242</span>
      </CardContent>
    </Card>
  )
}
