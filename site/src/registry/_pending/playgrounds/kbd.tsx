import type { ComponentProps } from "react"

import { Kbd, KbdGroup } from "@diametral/ui/components/kbd"

export default function KbdPlayground({
  children,
  ...props
}: ComponentProps<typeof Kbd>) {
  return (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd {...props}>{children}</Kbd>
    </KbdGroup>
  )
}
