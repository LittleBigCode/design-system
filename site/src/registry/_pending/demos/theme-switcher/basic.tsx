import * as React from "react"

import {
  ThemeSwitcher,
  type ThemeSwitcherMode,
} from "@diametral/ui/components/theme-switcher"

export default function ThemeSwitcherBasic() {
  const [mode, setMode] = React.useState<ThemeSwitcherMode>("system")

  return <ThemeSwitcher value={mode} onValueChange={setMode} />
}
