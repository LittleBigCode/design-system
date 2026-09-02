import { Avatar, AvatarFallback } from "@diametral/design-system/react"
import { Bubble, BubbleContent } from "@diametral/design-system/react"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
  MessageHeader,
} from "@diametral/design-system/react"

export default function MessageBasic() {
  return (
    <MessageGroup className="max-w-md">
      <Message>
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarFallback>CR</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Camille</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>
              The palette is locked. Eight tones, no exceptions.
            </BubbleContent>
          </Bubble>
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
            <BubbleContent>Understood — updating the tokens now.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}
