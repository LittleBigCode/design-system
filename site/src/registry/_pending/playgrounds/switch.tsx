import type { ComponentProps } from "react"

import { Label } from "@diametral/ui/components/label"
import { Switch } from "@diametral/ui/components/switch"

export default function SwitchPlayground({
  children,
  ...props
}: ComponentProps<typeof Switch>) {
  return (
    <div className="flex items-center gap-2">
      <Switch id="switch-playground" {...props} />
      <Label htmlFor="switch-playground">{children}</Label>
    </div>
  )
}
