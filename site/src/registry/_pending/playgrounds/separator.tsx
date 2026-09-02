import type { ComponentProps } from "react"

import { Separator } from "@diametral/ui/components/separator"

// The row wraps, so a horizontal separator takes its own line between the two
// labels while a vertical one stretches to the container's height beside them.
export default function SeparatorPlayground(
  props: ComponentProps<typeof Separator>
) {
  return (
    <div className="flex h-24 w-full max-w-xs flex-wrap items-center justify-center gap-4 text-sm">
      <span>Docs</span>
      <Separator {...props} />
      <span>Tokens</span>
    </div>
  )
}
