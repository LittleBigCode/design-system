import * as React from "react"

import { Panel, Switch } from "@diametral/design-system/react"
import {
  ThemeSwitcher,
  type ThemeSwitcherMode,
} from "@diametral/design-system/react"

export default function ThemeSwitcherSettingsRow() {
  const [mode, setMode] = React.useState<ThemeSwitcherMode>("system")

  return (
    // `rows` tightens the panel's bottom padding for label-and-control rows,
    // which is the shape this settings block wants.
    <Panel className="w-full max-w-sm" title="Appearance" rows>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          {/* The switcher's own group already carries aria-label="Theme", so
              this visible text needs no htmlFor wiring. */}
          <span className="text-sm">Theme</span>
          <ThemeSwitcher value={mode} onValueChange={setMode} />
        </div>
        <Switch>Reduce motion</Switch>
      </div>
    </Panel>
  )
}
