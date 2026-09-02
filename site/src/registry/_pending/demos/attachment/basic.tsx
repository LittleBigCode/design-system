import { FilePdfIcon, XIcon } from "@phosphor-icons/react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@diametral/ui/components/attachment"

const FILES = [
  { name: "charte-diametral.pdf", size: "2,4 Mo" },
  { name: "audit-technique.pdf", size: "812 Ko" },
]

export default function AttachmentBasic() {
  return (
    <AttachmentGroup className="max-w-md">
      {FILES.map((file) => (
        <Attachment key={file.name}>
          <AttachmentMedia>
            <FilePdfIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{file.name}</AttachmentTitle>
            <AttachmentDescription>{file.size}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label={`Remove ${file.name}`}>
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </AttachmentGroup>
  )
}
