import type { ComponentProps } from "react"
import { FileTextIcon, XIcon } from "@phosphor-icons/react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@diametral/ui/components/attachment"

export default function AttachmentPlayground({
  children,
  ...props
}: ComponentProps<typeof Attachment>) {
  return (
    <AttachmentGroup className="w-full max-w-sm">
      <Attachment {...props}>
        {/* The trigger is an overlay, so it covers the tile without wrapping the
            actions beside it — those stay separately clickable. */}
        <AttachmentTrigger aria-label="Open the attachment" />
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>{children}</AttachmentTitle>
          <AttachmentDescription>1.2 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove the attachment">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </AttachmentGroup>
  )
}
