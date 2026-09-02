import { Avatar, Button } from "@diametral/design-system/react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@diametral/design-system/react"

export default function HoverCardWithAvatar() {
  return (
    <HoverCard>
      <HoverCardTrigger render={<Button size="sm" />}>
        <Avatar size="sm" initials="CR" />
        Camille Roux
      </HoverCardTrigger>
      <HoverCardContent side="top">
        <div className="flex items-start gap-3">
          <Avatar size="lg" initials="CR" />
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-wider uppercase">
              Camille Roux
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Design lead. Maintains the charter and reviews every token change.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
