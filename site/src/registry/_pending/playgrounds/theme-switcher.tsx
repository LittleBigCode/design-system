import * as React from "react"
import type { ComponentProps } from "react"

import {
  ThemeSwitcher,
  type ThemeSwitcherMode,
} from "@diametral/ui/components/theme-switcher"

// value/onValueChange are required, so the playground holds its own state
// to make the panel interactive — nothing here reaches the real app theme.
export default function ThemeSwitcherPlayground(
  props: Omit<ComponentProps<typeof ThemeSwitcher>, "value" | "onValueChange">
) {
  const [mode, setMode] = React.useState<ThemeSwitcherMode>("system")

  return <ThemeSwitcher value={mode} onValueChange={setMode} {...props} />
}
