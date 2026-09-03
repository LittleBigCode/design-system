import * as React from "react"

import {
  ThemeSwitcher,
  type ThemeSwitcherMode,
} from "@diametral/design-system/react"

export default function ThemeSwitcherCycle() {
  const [mode, setMode] = React.useState<ThemeSwitcherMode>("light")

  return <ThemeSwitcher variant="cycle" value={mode} onValueChange={setMode} />
}
