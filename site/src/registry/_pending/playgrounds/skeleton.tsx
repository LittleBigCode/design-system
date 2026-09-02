import type { ComponentProps } from "react"

import { Skeleton } from "@diametral/ui/components/skeleton"

// Skeleton contributes the pulse and the fill; size and shape are entirely the
// caller's, so `className` is genuinely the whole API — hence a shape control,
// declared `always` because a Skeleton with no size renders nothing at all.
export default function SkeletonPlayground(
  props: ComponentProps<typeof Skeleton>
) {
  return <Skeleton {...props} />
}
