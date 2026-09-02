import {
  DownloadSimpleIcon,
  EnvelopeIcon,
  LinkIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react"

import { SpeedDial, SpeedDialAction } from "@diametral/ui/components/speed-dial"

export default function SpeedDialDocked() {
  return (
    <div className="relative h-64 w-full max-w-md border border-border bg-muted/30">
      <SpeedDial
        label="Share report"
        icon={<ShareNetworkIcon />}
        side="bottom"
        className="absolute end-4 top-4 bottom-auto"
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
