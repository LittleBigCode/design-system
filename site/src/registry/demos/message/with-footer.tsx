import { Avatar, AvatarFallback } from "@diametral/design-system/react"
import { Bubble, BubbleContent } from "@diametral/design-system/react"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
} from "@diametral/design-system/react"

export default function MessageWithFooter() {
  return (
    <MessageGroup className="max-w-md">
      <Message>
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarFallback>CR</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>Sent you the export.</BubbleContent>
          </Bubble>
          <MessageFooter>14:02</MessageFooter>
        </MessageContent>
      </Message>

      <Message align="end">
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble>
            <BubbleContent>Got it, thanks.</BubbleContent>
          </Bubble>
          <MessageFooter>14:03 · Read</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}
