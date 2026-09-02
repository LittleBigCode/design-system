import type { ComponentProps } from "react"

import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@diametral/design-system/react"

export default function BubblePlayground({
  children,
  ...props
}: ComponentProps<typeof Bubble>) {
  return (
    <BubbleGroup className="w-full max-w-sm">
      <Bubble {...props}>
        <BubbleContent>{children}</BubbleContent>
        <BubbleReactions>🎉 2</BubbleReactions>
      </Bubble>
    </BubbleGroup>
  )
}
