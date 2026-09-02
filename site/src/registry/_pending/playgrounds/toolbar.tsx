import type { ComponentProps } from "react"
import {
  ArrowUUpLeftIcon,
  ArrowUUpRightIcon,
  TextAlignLeftIcon,
} from "@phosphor-icons/react"

import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
} from "@diametral/ui/components/toolbar"

export default function ToolbarPlayground(
  props: ComponentProps<typeof Toolbar>
) {
  return (
    <Toolbar {...props}>
      <ToolbarGroup>
        <ToolbarButton aria-label="Undo">
          <ArrowUUpLeftIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Redo">
          <ArrowUUpRightIcon />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Align left">
        <TextAlignLeftIcon />
      </ToolbarButton>
      <ToolbarSeparator />
      <ToolbarInput placeholder="Filter…" aria-label="Filter rows" />
      <ToolbarLink href="#workbench">Reset</ToolbarLink>
    </Toolbar>
  )
}
