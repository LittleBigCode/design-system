import type { ComponentProps } from "react"

import {
  StatCard,
  StatCardDelta,
  StatCardLabel,
  StatCardSpark,
  StatCardValue,
} from "@diametral/ui/components/stat-card"

// The axis (up/down) belongs to StatCardDelta, so it is routed there rather
// than spread onto the root. Every part is rendered — the code strip doubles
// as the anatomy navigator, so an unrendered part would not be selectable.
export default function StatCardPlayground({
  children,
  value = "1 284",
  direction,
  ...props
}: ComponentProps<typeof StatCard> & {
  value?: string
  direction?: ComponentProps<typeof StatCardDelta>["direction"]
}) {
  return (
    <StatCard className="w-56" {...props}>
      <StatCardLabel>{children}</StatCardLabel>
      <StatCardValue>{value}</StatCardValue>
      <StatCardDelta direction={direction}>
        {direction === "down" ? "-4.2%" : "+12.4%"}
      </StatCardDelta>
      <StatCardSpark>
        <svg viewBox="0 0 100 20" className="h-6 w-full" aria-hidden="true">
          <polyline
            points="0,18 14,14 29,15 43,9 57,11 71,5 86,6 100,2"
            fill="none"
            stroke="var(--ds-chart-1)"
            strokeWidth={2}
          />
        </svg>
      </StatCardSpark>
    </StatCard>
  )
}
