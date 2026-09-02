import type { ComponentProps } from "react"

import { Masonry } from "@diametral/ui/components/masonry"

const HEIGHTS = [140, 220, 100, 180, 260, 120, 200, 150]

export default function MasonryPlayground({
  columns = "3",
  ...rest
}: {
  columns?: string
  className?: string
}) {
  const props = {
    ...rest,
    columns: Number(columns),
  } as ComponentProps<typeof Masonry>

  return (
    <Masonry {...props} className="w-full max-w-md">
      {HEIGHTS.map((height, index) => (
        <div
          key={index}
          className="flex items-center justify-center border border-border bg-muted/50 text-xs text-muted-foreground"
          style={{ height }}
        >
          {index + 1}
        </div>
      ))}
    </Masonry>
  )
}
