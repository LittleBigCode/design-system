import * as React from "react"

import {
  Label,
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
  Switch,
  ThemeSwitcher,
  type ThemeSwitcherMode,
} from "@diametral/design-system/react"

export default function ThemeSwitcherSettingsRow() {
  const [mode, setMode] = React.useState<ThemeSwitcherMode>("system")

  return (
    // `rows` tightens the panel's bottom padding for label-and-control rows,
    // which is the shape this settings block wants.
    <Panel className="w-full max-w-sm" rows>
      <PanelHeader>
        <PanelTitle>Appearance</PanelTitle>
      </PanelHeader>
      <PanelContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          {/* The switcher's own group already carries aria-label="Theme", so
              this visible text needs no htmlFor wiring. */}
          <span className="text-sm">Theme</span>
          <ThemeSwitcher value={mode} onValueChange={setMode} />
        </div>
        {/* The absorbed Switch is the track, not a label around one, so its
            caption is a Label pointed at it. */}
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="settings-row-motion">Reduce motion</Label>
          <Switch id="settings-row-motion" />
        </div>
      </PanelContent>
    </Panel>
  )
}
