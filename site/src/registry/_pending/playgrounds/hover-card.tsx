import type { ComponentProps } from "react"

import { Button } from "@diametral/ui/components/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@diametral/ui/components/hover-card"

export default function HoverCardPlayground({
  children,
  ...props
}: ComponentProps<typeof HoverCardContent>) {
  return (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="ghost" />}>
        Camille Roux
      </HoverCardTrigger>
      <HoverCardContent {...props}>
        <p className="text-xs font-semibold tracking-wider uppercase">
          {children}
        </p>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Design lead. Maintains the charter.
        </p>
      </HoverCardContent>
    </HoverCard>
  )
}
