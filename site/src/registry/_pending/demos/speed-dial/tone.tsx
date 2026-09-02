import {
  ArrowCounterClockwiseIcon,
  LightningIcon,
  PlayIcon,
  StopIcon,
} from "@phosphor-icons/react"

import { SpeedDial, SpeedDialAction } from "@diametral/ui/components/speed-dial"

export default function SpeedDialTone() {
  return (
    <div className="relative h-64 w-full max-w-md border border-border bg-muted/30">
      <SpeedDial
        label="Pipeline controls"
        icon={<LightningIcon />}
        tone="red"
        className="absolute end-4 bottom-4"
      >
        <SpeedDialAction icon={<PlayIcon />}>Run now</SpeedDialAction>
        <SpeedDialAction icon={<ArrowCounterClockwiseIcon />}>
          Retry failed
        </SpeedDialAction>
        <SpeedDialAction icon={<StopIcon />} disabled>
          Stop run
        </SpeedDialAction>
      </SpeedDial>
    </div>
  )
}
