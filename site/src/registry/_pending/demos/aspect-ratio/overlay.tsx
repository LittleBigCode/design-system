import { PlayIcon } from "@phosphor-icons/react"

import { AspectRatio } from "@diametral/ui/components/aspect-ratio"
import { Badge } from "@diametral/ui/components/badge"

export default function AspectRatioOverlay() {
  return (
    <AspectRatio
      ratio={21 / 9}
      className="w-full max-w-md border border-border bg-muted"
    >
      <div className="flex size-full items-center justify-center text-muted-foreground">
        <PlayIcon className="size-8" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-background px-3 py-2">
        <span className="text-sm font-medium">Release walkthrough</span>
        <Badge variant="outline" className="tabular-nums">
          4:12
        </Badge>
      </div>
    </AspectRatio>
  )
}
