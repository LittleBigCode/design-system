import { MagnifyingGlassIcon } from "@phosphor-icons/react"

import {
  Button,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarSeparator,
} from "@diametral/design-system/react"

export default function Toolbar01() {
  return (
    <Toolbar className="w-full">
      <ToolbarButton aria-label="Search">
        <MagnifyingGlassIcon />
      </ToolbarButton>
      <ToolbarInput placeholder="Search rates…" aria-label="Search rates" />

      <ToolbarSeparator />

      <ToolbarGroup className="ms-auto">
        <Button>Columns</Button>
        <Button>Export</Button>
        <Button variant="primary">New rate</Button>
      </ToolbarGroup>
    </Toolbar>
  )
}
