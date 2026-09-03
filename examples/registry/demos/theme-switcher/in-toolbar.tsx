import * as React from "react"
import { GearIcon } from "@phosphor-icons/react"

import { IconButton } from "@diametral/design-system/react"
import { Separator } from "@diametral/design-system/react"
import {
  ThemeSwitcher,
  type ThemeSwitcherMode,
} from "@diametral/design-system/react"

export default function ThemeSwitcherInToolbar() {
  const [mode, setMode] = React.useState<ThemeSwitcherMode>("system")

  return (
    <div className="flex items-center gap-3 border border-border bg-card px-3 py-2">
      <span className="text-sm font-medium">Diametral</span>
      <Separator orientation="vertical" className="h-5" />
      <ThemeSwitcher value={mode} onValueChange={setMode} />
      <IconButton size="sm" label="Settings">
        <GearIcon />
      </IconButton>
    </div>
  )
}
