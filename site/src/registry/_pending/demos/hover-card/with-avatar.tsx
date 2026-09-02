import { Avatar, AvatarFallback } from "@diametral/ui/components/avatar"
import { Button } from "@diametral/ui/components/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@diametral/ui/components/hover-card"

export default function HoverCardWithAvatar() {
  return (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="ghost" size="sm" />}>
        <Avatar size="sm">
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
        Camille Roux
      </HoverCardTrigger>
      <HoverCardContent side="top">
        <div className="flex items-start gap-3">
          <Avatar size="lg">
            <AvatarFallback>CR</AvatarFallback>
          </Avatar>
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
