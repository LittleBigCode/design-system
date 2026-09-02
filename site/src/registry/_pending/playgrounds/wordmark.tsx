import type { ComponentProps } from "react"

import { Wordmark } from "@diametral/ui/components/wordmark"

export default function WordmarkPlayground(
  props: ComponentProps<typeof Wordmark>
) {
  return <Wordmark {...props} />
}
