import type { ComponentProps } from "react"

import { Avatar } from "@diametral/design-system/react"
import { Bubble, BubbleContent } from "@diametral/design-system/react"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@diametral/design-system/react"

export default function MessagePlayground({
  children,
  ...props
}: ComponentProps<typeof Message>) {
  return (
    <MessageGroup className="w-full max-w-sm">
      <Message {...props}>
        <MessageAvatar>
          <Avatar size="sm" initials="CR" />
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Camille Ferrand</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>{children}</BubbleContent>
          </Bubble>
          <MessageFooter>14:02</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}
