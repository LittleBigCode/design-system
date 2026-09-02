import { FileIcon, PlusIcon, WarningIcon } from "@phosphor-icons/react"

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@diametral/ui/components/attachment"
import { Spinner } from "@diametral/ui/components/spinner"

export default function AttachmentStates() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Attachment state="uploading">
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>rapport-final.pdf</AttachmentTitle>
          <AttachmentDescription>Uploading — 64 %</AttachmentDescription>
        </AttachmentContent>
      </Attachment>

      <Attachment state="error">
        <AttachmentMedia>
          <WarningIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>video-brut.mov</AttachmentTitle>
          <AttachmentDescription>
            Too large — 512 Mo limit
          </AttachmentDescription>
        </AttachmentContent>
      </Attachment>

      <Attachment state="idle">
        <AttachmentTrigger aria-label="Add a file" />
        <AttachmentMedia>
          <PlusIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Add a file</AttachmentTitle>
          <AttachmentDescription>PDF, PNG or MOV</AttachmentDescription>
        </AttachmentContent>
      </Attachment>

      <Attachment size="sm">
        <AttachmentMedia>
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>notes.txt</AttachmentTitle>
        </AttachmentContent>
      </Attachment>
    </div>
  )
}
