import {
  Toolbar,
  ToolbarButton,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
} from "@diametral/design-system/react"
import { FunnelIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"

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
