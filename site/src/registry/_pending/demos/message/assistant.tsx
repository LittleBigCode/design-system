import { SparkleIcon } from "@phosphor-icons/react"

import { Avatar, AvatarFallback } from "@diametral/ui/components/avatar"
import { Bubble, BubbleContent } from "@diametral/ui/components/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@diametral/ui/components/message"

export default function MessageAssistant() {
  return (
    <MessageGroup className="max-w-md">
      <Message align="end">
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
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
          <Avatar size="sm">
            <AvatarFallback>
              <SparkleIcon />
            </AvatarFallback>
          </Avatar>
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
