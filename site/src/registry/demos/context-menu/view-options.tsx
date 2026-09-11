import * as React from "react"
import { ArrowsClockwiseIcon } from "@phosphor-icons/react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@diametral/design-system/react"

export default function ContextMenuViewOptions() {
  const [layout, setLayout] = React.useState("grid")

  return (
    <ContextMenu>
      <ContextMenuTrigger
        render={
          <div className="flex h-40 w-full max-w-sm flex-col items-center justify-center gap-1 border border-dashed border-border text-sm text-muted-foreground" />
        }
      >
        <span>Right-click the canvas</span>
        <span className="text-xs">Layout: {layout}</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuRadioGroup value={layout} onValueChange={setLayout}>
          <ContextMenuLabel>Layout</ContextMenuLabel>
          <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
          <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
          <ContextMenuRadioItem value="columns">Columns</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <ArrowsClockwiseIcon /> Refresh
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
