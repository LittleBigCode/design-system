import { CopyIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@diametral/design-system/react"

export default function ContextMenuBasic() {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        render={
          <div className="flex h-32 w-full max-w-sm items-center justify-center border border-dashed border-border text-sm text-muted-foreground" />
        }
      >
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <PencilSimpleIcon /> Rename
        </ContextMenuItem>
        <ContextMenuItem>
          <CopyIcon /> Duplicate
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <TrashIcon /> Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
