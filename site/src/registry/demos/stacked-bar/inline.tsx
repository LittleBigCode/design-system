import type { CSSProperties } from "react"

import { Card, StackedBar, type ChartConfig } from "@diametral/design-system/react"

const DATA = [{ passed: 412, failed: 9, skipped: 23 }]

const CONFIG = {
  passed: { label: "Passed", color: "var(--ds-chart-3)" },
  failed: { label: "Failed", color: "var(--ds-chart-1)" },
  skipped: { label: "Skipped", color: "var(--ds-chart-4)" },
} satisfies ChartConfig

/* `Card`'s compound parts are batch 7; the incumbent takes its heading as a
   `title` prop, which is the same header in one element.

   The strip is 2rem tall, set through `--ds-chart-height` rather than a height
   class: the container's own height is a real declaration here, so a competing
   class would be decided by stylesheet order. */
export default function StackedBarInline() {
  return (
    <Card className="w-full max-w-sm" title="Test run 4 812">
      <StackedBar
        config={CONFIG}
        data={DATA}
        showLegend={false}
        style={{ "--ds-chart-height": "2rem" } as CSSProperties}
      />
      <p className="mt-3 text-sm text-muted-foreground">
        412 passed, 9 failed, 23 skipped in 3m 41s.
      </p>
    </Card>
  )
}
