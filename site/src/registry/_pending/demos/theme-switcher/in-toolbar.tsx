import * as React from "react"
import { GearIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import { Separator } from "@diametral/ui/components/separator"
import {
  ThemeSwitcher,
  type ThemeSwitcherMode,
} from "@diametral/ui/components/theme-switcher"

export default function ThemeSwitcherInToolbar() {
  const [mode, setMode] = React.useState<ThemeSwitcherMode>("system")

  return (
    <div className="flex items-center gap-3 border border-border bg-card px-3 py-2">
      <span className="text-sm font-medium">Diametral</span>
      <Separator orientation="vertical" className="h-5" />
      <ThemeSwitcher value={mode} onValueChange={setMode} />
      <Button size="icon-sm" variant="ghost" aria-label="Settings">
        <GearIcon />
      </Button>
    </div>
  )
}
