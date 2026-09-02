import type { ComponentProps } from "react"

import { ScrollArea } from "@diametral/ui/components/scroll-area"
import { Separator } from "@diametral/ui/components/separator"

const ROWS = Array.from({ length: 20 }, (_, index) => `Commit ${index + 1}`)

// The root needs a bounded height for anything to scroll, so the height is the
// control. Note only a vertical scrollbar is rendered today.
export default function ScrollAreaPlayground(
  props: ComponentProps<typeof ScrollArea>
) {
  return (
    <ScrollArea className="w-full max-w-3xs border border-border" {...props}>
      <div className="p-4">
        {ROWS.map((row, index) => (
          <div key={row}>
            {index > 0 && <Separator className="my-2.5" />}
            <span className="text-sm">{row}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
