import { Avatar, AvatarBadge, AvatarFallback } from "@diametral/design-system/react"
import { CheckIcon } from "@phosphor-icons/react"

export default function AvatarSizes() {
  return (
    <div className="flex items-end gap-4">
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
        <AvatarBadge>
          <CheckIcon />
        </AvatarBadge>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
        <AvatarBadge>
          <CheckIcon />
        </AvatarBadge>
      </Avatar>
    </div>
  )
}
