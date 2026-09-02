import { FunnelIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"

import {
  Toolbar,
  ToolbarButton,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
} from "@diametral/ui/components/toolbar"

export default function ToolbarWithInput() {
  return (
    <Toolbar>
      <ToolbarButton aria-label="Search">
        <MagnifyingGlassIcon />
      </ToolbarButton>
      <ToolbarInput placeholder="Filter…" aria-label="Filter rows" />
      <ToolbarButton aria-label="Advanced filters">
        <FunnelIcon />
      </ToolbarButton>

      <ToolbarSeparator />

      <ToolbarLink href="#toolbar">Reset</ToolbarLink>
    </Toolbar>
  )
}
