import { DownloadSimpleIcon, LinkIcon, TrashIcon } from "@phosphor-icons/react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@diametral/design-system/react"

const FILES = [
  { name: "charte-2026.pdf", size: "2.4 MB" },
  { name: "tone-tokens.csv", size: "18 KB" },
  { name: "wordmark-lockup.svg", size: "6 KB" },
]

export default function ContextMenuRows() {
  return (
    <ul className="w-full max-w-sm border border-border">
      {FILES.map((file) => (
        <ContextMenu key={file.name}>
          <ContextMenuTrigger
            render={
              <li className="flex items-center justify-between border-b border-border px-3 py-2 text-sm last:border-b-0" />
            }
          >
            <span>{file.name}</span>
            <span className="text-xs text-muted-foreground">{file.size}</span>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuGroup>
              <ContextMenuLabel>{file.name}</ContextMenuLabel>
              <ContextMenuItem>
                <DownloadSimpleIcon /> Download
              </ContextMenuItem>
              <ContextMenuItem>
                <LinkIcon /> Copy link
                <ContextMenuShortcut>⌘K</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">
              <TrashIcon /> Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </ul>
  )
}
