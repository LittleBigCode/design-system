import { ButtonGroup, IconButton } from "@diametral/design-system/react"
import {
  ArrowClockwiseIcon,
  DownloadSimpleIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react"

export default function IconButtonToolbar() {
  return (
    <ButtonGroup>
      <IconButton label="Search">
        <MagnifyingGlassIcon />
      </IconButton>
      <IconButton label="Filter results">
        <FunnelIcon />
      </IconButton>
      <IconButton label="Refresh">
        <ArrowClockwiseIcon />
      </IconButton>
      <IconButton label="Export as CSV">
        <DownloadSimpleIcon />
      </IconButton>
    </ButtonGroup>
  )
}
