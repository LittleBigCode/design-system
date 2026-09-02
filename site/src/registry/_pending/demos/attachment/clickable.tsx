import { DownloadSimpleIcon, FilePdfIcon, XIcon } from "@phosphor-icons/react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@diametral/ui/components/attachment"

export default function AttachmentClickable() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Attachment>
        <AttachmentTrigger
          render={<a href="#attachment" />}
          aria-label="Open charte-diametral.pdf"
        />
        <AttachmentMedia>
          <FilePdfIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>charte-diametral.pdf</AttachmentTitle>
          <AttachmentDescription>2,4 Mo · PDF</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove charte-diametral.pdf">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>

      <Attachment size="sm">
        <AttachmentTrigger aria-label="Preview audit-technique.pdf" />
        <AttachmentMedia>
          <FilePdfIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>audit-technique.pdf</AttachmentTitle>
          <AttachmentDescription>812 Ko · PDF</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Download audit-technique.pdf">
            <DownloadSimpleIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  )
}
