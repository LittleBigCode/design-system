import {
  ArrowClockwiseIcon,
  DownloadSimpleIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react"

import { ButtonGroup } from "@diametral/ui/components/button-group"
import { IconButton } from "@diametral/ui/components/icon-button"

export default function IconButtonToolbar() {
  return (
    <ButtonGroup>
      <IconButton label="Search" variant="outline">
        <MagnifyingGlassIcon />
      </IconButton>
      <IconButton label="Filter results" variant="outline">
        <FunnelIcon />
      </IconButton>
      <IconButton label="Refresh" variant="outline">
        <ArrowClockwiseIcon />
      </IconButton>
      <IconButton label="Export as CSV" variant="outline">
        <DownloadSimpleIcon />
      </IconButton>
    </ButtonGroup>
  )
}
