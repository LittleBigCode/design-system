import {
  DownloadSimpleIcon,
  EnvelopeIcon,
  LinkIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react"

import { SpeedDial, SpeedDialAction } from "@diametral/design-system/react"

export default function SpeedDialDocked() {
  return (
    <div className="relative h-64 w-full max-w-md border border-border bg-muted/30">
      <SpeedDial
        label="Share report"
        icon={<ShareNetworkIcon />}
        side="bottom"
        className="ds-speed-dial--docked ds-speed-dial--docked-top"
      >
        <SpeedDialAction icon={<LinkIcon />}>Copy link</SpeedDialAction>
        <SpeedDialAction icon={<EnvelopeIcon />}>Email a copy</SpeedDialAction>
        <SpeedDialAction icon={<DownloadSimpleIcon />}>
          Download PDF
        </SpeedDialAction>
      </SpeedDial>
    </div>
  )
}
