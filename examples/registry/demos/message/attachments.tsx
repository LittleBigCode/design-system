import { FilePdfIcon, FileXlsIcon } from "@phosphor-icons/react"

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@diametral/design-system/react"
import { Avatar, AvatarFallback } from "@diametral/design-system/react"
import { Bubble, BubbleContent } from "@diametral/design-system/react"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
} from "@diametral/design-system/react"

const FILES = [
  {
    name: "audit-technique.pdf",
    size: "812 Ko",
    icon: <FilePdfIcon />,
  },
  {
    name: "budget-2027.xlsx",
    size: "96 Ko",
    icon: <FileXlsIcon />,
  },
]

export default function MessageAttachments() {
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
              Both files from the audit, as promised.
            </BubbleContent>
          </Bubble>
          <AttachmentGroup>
            {FILES.map((file) => (
              <Attachment key={file.name} size="sm">
                <AttachmentMedia>{file.icon}</AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>{file.name}</AttachmentTitle>
                  <AttachmentDescription>{file.size}</AttachmentDescription>
                </AttachmentContent>
              </Attachment>
            ))}
          </AttachmentGroup>
          <MessageFooter>16:20 · Delivered</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}
