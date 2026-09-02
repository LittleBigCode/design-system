import {
  CopyIcon,
  DownloadSimpleIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react"

import {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
} from "@diametral/ui/components/toolbar"

export default function ToolbarVertical() {
  return (
    <Toolbar orientation="vertical">
      <ToolbarButton aria-label="Edit">
        <PencilSimpleIcon />
      </ToolbarButton>
      <ToolbarButton aria-label="Duplicate">
        <CopyIcon />
      </ToolbarButton>
      <ToolbarButton aria-label="Download">
        <DownloadSimpleIcon />
      </ToolbarButton>

      <ToolbarSeparator />

      <ToolbarButton aria-label="Delete" variant="destructive">
        <TrashIcon />
      </ToolbarButton>
    </Toolbar>
  )
}
