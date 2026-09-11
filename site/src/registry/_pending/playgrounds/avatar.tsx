import type { ComponentProps } from "react"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
} from "@diametral/ui/components/avatar"

// No AvatarImage here on purpose: a loaded portrait hides the fallback, and the
// fallback is what the initials control writes to. The image, the group and its
// overflow count are what the examples below are for.
export default function AvatarPlayground({
  children,
  ...props
}: ComponentProps<typeof Avatar>) {
  return (
    <Avatar {...props}>
      <AvatarFallback>{children}</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  )
}
