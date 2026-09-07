import type { ComponentProps } from "react"
import { Tag } from "@diametral/design-system/react"

export default function TagPlayground({
  children,
  ...props
}: ComponentProps<typeof Tag>) {
  return <Tag {...props}>{children}</Tag>
}
