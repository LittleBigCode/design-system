import type { ComponentProps } from "react"

import { Tag } from "@diametral/ui/components/tag"

export default function TagPlayground({
  children,
  ...props
}: ComponentProps<typeof Tag>) {
  return <Tag {...props}>{children}</Tag>
}
