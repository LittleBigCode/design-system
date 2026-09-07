import {
  FileTextIcon,
  PlusIcon,
  UploadSimpleIcon,
  UserPlusIcon,
} from "@phosphor-icons/react"

import { SpeedDial, SpeedDialAction } from "@diametral/design-system/react"

export default function SpeedDialBasic() {
  return (
    <div className="relative h-64 w-full max-w-md border border-border bg-muted/30">
      <SpeedDial
        label="Create"
        icon={<PlusIcon />}
        className="ds-speed-dial--docked"
      >
        <SpeedDialAction icon={<FileTextIcon />}>New invoice</SpeedDialAction>
        <SpeedDialAction icon={<UserPlusIcon />}>New client</SpeedDialAction>
        <SpeedDialAction icon={<UploadSimpleIcon />}>
          Import CSV
        </SpeedDialAction>
      </SpeedDial>
    </div>
  )
}
