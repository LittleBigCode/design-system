import { SparkleIcon } from "@phosphor-icons/react"

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

export default function MessageAssistant() {
  return (
    <MessageGroup className="max-w-md">
      <Message align="end">
        <MessageAvatar>
          <Avatar size="sm" initials="AM" />
        </MessageAvatar>
        <MessageContent>
          <Bubble>
            <BubbleContent>
              Why are the corners square everywhere?
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>

      <Message>
        <MessageAvatar>
          <Avatar size="sm" initials={<SparkleIcon />} />
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Assistant</MessageHeader>
          <Bubble variant="ghost">
            <BubbleContent>
              The square radius is a charter rule rather than a token, so there
              is no variable to override. The two components that need a circle,
              Avatar and the reaction pill, opt into it themselves.
            </BubbleContent>
          </Bubble>
          <MessageFooter>Answered in 1.2 s</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}
