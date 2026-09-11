import type { ComponentProps } from "react"
import { Badge } from "@diametral/design-system/react"

export default function BadgePlayground({
  children,
  ...props
}: ComponentProps<typeof Badge>) {
  return <Badge {...props}>{children}</Badge>
}
