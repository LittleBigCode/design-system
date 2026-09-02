import * as React from "react"

import { Label } from "@diametral/ui/components/label"
import { Switch } from "@diametral/ui/components/switch"

export default function SwitchInToolbar() {
  const [deprecated, setDeprecated] = React.useState(false)

  return (
    <div className="flex w-full max-w-md items-center justify-between border-b pb-3">
      <span className="text-sm text-muted-foreground">
        {deprecated ? 94 : 88} components
      </span>
      <div className="flex items-center gap-2.5">
        <Label htmlFor="switch-toolbar-deprecated" className="text-xs">
          Show deprecated
        </Label>
        <Switch
          id="switch-toolbar-deprecated"
          size="sm"
          checked={deprecated}
          onCheckedChange={setDeprecated}
        />
      </div>
    </div>
  )
}
