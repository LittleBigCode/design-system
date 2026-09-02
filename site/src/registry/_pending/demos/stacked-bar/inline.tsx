import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@diametral/ui/components/card"
import type { ChartConfig } from "@diametral/ui/components/chart"
import { StackedBar } from "@diametral/ui/components/stacked-bar"

const DATA = [{ passed: 412, failed: 9, skipped: 23 }]

const CONFIG = {
  passed: { label: "Passed", color: "var(--ds-chart-3)" },
  failed: { label: "Failed", color: "var(--ds-chart-1)" },
  skipped: { label: "Skipped", color: "var(--ds-chart-4)" },
} satisfies ChartConfig

export default function StackedBarInline() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="border-b">
        <CardTitle>Test run 4 812</CardTitle>
      </CardHeader>
      <CardContent>
        <StackedBar
          config={CONFIG}
          data={DATA}
          showLegend={false}
          className="h-8"
        />
        <p className="mt-3 text-sm text-muted-foreground">
          412 passed, 9 failed, 23 skipped in 3m 41s.
        </p>
      </CardContent>
    </Card>
  )
}
