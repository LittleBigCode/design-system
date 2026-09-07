import type { ComponentProps } from "react"
import { CopyIcon, ExportIcon, TrashIcon } from "@phosphor-icons/react"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@diametral/design-system/react"

export default function ContextMenuPlayground(
  props: ComponentProps<typeof ContextMenuContent>
) {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        render={
          <div className="flex h-28 w-full max-w-3xs items-center justify-center border border-dashed border-border text-sm text-muted-foreground" />
        }
      >
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent {...props}>
        <ContextMenuGroup>
          <ContextMenuLabel>Sheet</ContextMenuLabel>
          <ContextMenuItem>
            <CopyIcon /> Duplicate
            <ContextMenuShortcut>⌘D</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuCheckboxItem defaultChecked>
            Snap to grid
          </ContextMenuCheckboxItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup defaultValue="mm">
          <ContextMenuLabel>Units</ContextMenuLabel>
          <ContextMenuRadioItem value="mm">Millimetres</ContextMenuRadioItem>
          <ContextMenuRadioItem value="in">Inches</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <ExportIcon /> Export as
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>DXF</ContextMenuItem>
            <ContextMenuItem>PDF</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem variant="destructive">
          <TrashIcon /> Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
