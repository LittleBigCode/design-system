import {
  FileTextIcon,
  PlusIcon,
  UploadSimpleIcon,
  UserPlusIcon,
} from "@phosphor-icons/react"

import { SpeedDial, SpeedDialAction } from "@diametral/ui/components/speed-dial"

export default function SpeedDialBasic() {
  return (
    <div className="relative h-64 w-full max-w-md border border-border bg-muted/30">
      <SpeedDial
        label="Create"
        icon={<PlusIcon />}
        className="absolute end-4 bottom-4"
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
