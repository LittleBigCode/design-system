import type { ComponentProps } from "react"

import { Button } from "@diametral/design-system/react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@diametral/design-system/react"

export default function HoverCardPlayground({
  children,
  ...props
}: ComponentProps<typeof HoverCardContent>) {
  return (
    <HoverCard>
      <HoverCardTrigger render={<Button />}>
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
