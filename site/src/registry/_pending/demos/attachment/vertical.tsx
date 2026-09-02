import { FileIcon, ImageIcon, MusicNotesIcon } from "@phosphor-icons/react"

import {
  Attachment,
  AttachmentContent,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@diametral/ui/components/attachment"

const ITEMS = [
  { name: "cover.png", icon: <ImageIcon /> },
  { name: "jingle.mp3", icon: <MusicNotesIcon /> },
  { name: "brief.md", icon: <FileIcon /> },
  { name: "notes.txt", icon: <FileIcon /> },
]

export default function AttachmentVertical() {
  return (
    <AttachmentGroup className="max-w-sm">
      {ITEMS.map((item) => (
        <Attachment key={item.name} orientation="vertical">
          <AttachmentMedia>{item.icon}</AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{item.name}</AttachmentTitle>
          </AttachmentContent>
        </Attachment>
      ))}
    </AttachmentGroup>
  )
}
