import type { ComponentProps } from "react"
import {
  FileTextIcon,
  PlusIcon,
  UploadSimpleIcon,
  UserPlusIcon,
} from "@phosphor-icons/react"

import { SpeedDial, SpeedDialAction } from "@diametral/ui/components/speed-dial"

export default function SpeedDialPlayground({
  children,
  second = "New client",
  third = "Import CSV",
  ...props
}: ComponentProps<typeof SpeedDial> & {
  second?: string
  third?: string
}) {
  return (
    <div className="relative h-64 w-full max-w-md border border-border bg-muted/30">
      <SpeedDial
        {...props}
        icon={<PlusIcon />}
        className="absolute end-4 bottom-4"
      >
        <SpeedDialAction icon={<FileTextIcon />}>{children}</SpeedDialAction>
        <SpeedDialAction icon={<UserPlusIcon />}>{second}</SpeedDialAction>
        <SpeedDialAction icon={<UploadSimpleIcon />}>{third}</SpeedDialAction>
      </SpeedDial>
    </div>
  )
}
