import * as React from "react"

import {
  ThemeSwitcher,
  type ThemeSwitcherMode,
} from "@diametral/ui/components/theme-switcher"

export default function ThemeSwitcherDropdown() {
  const [mode, setMode] = React.useState<ThemeSwitcherMode>("system")

  return (
    <ThemeSwitcher variant="dropdown" value={mode} onValueChange={setMode} />
  )
}
