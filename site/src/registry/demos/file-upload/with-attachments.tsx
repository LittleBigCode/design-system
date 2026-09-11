import * as React from "react"
import { FileIcon, XIcon } from "@phosphor-icons/react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  FileUpload,
  FileUploadDescription,
  FileUploadIcon,
  FileUploadTitle,
} from "@diametral/design-system/react"

function formatSize(bytes: number) {
  const kilobytes = bytes / 1000
  return kilobytes < 1000
    ? `${Math.round(kilobytes)} Ko`
    : `${(kilobytes / 1000).toFixed(1)} Mo`
}

export default function FileUploadWithAttachments() {
  const [files, setFiles] = React.useState<File[]>([])

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <FileUpload
        multiple
        onFiles={(next) => setFiles((current) => [...current, ...next])}
      >
        <FileUploadIcon />
        <FileUploadTitle>Add attachments</FileUploadTitle>
        <FileUploadDescription>
          Or drag them onto this area.
        </FileUploadDescription>
      </FileUpload>

      {files.map((file) => (
        <Attachment key={file.name} size="sm">
          <AttachmentMedia>
            <FileIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{file.name}</AttachmentTitle>
            <AttachmentDescription>
              {formatSize(file.size)}
            </AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction
              label={`Remove ${file.name}`}
              onClick={() =>
                setFiles((current) =>
                  current.filter((item) => item.name !== file.name)
                )
              }
            >
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </div>
  )
}
