import * as React from "react"

import { Label } from "@diametral/ui/components/label"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelRow,
  PanelTitle,
} from "@diametral/ui/components/panel"
import { Switch } from "@diametral/ui/components/switch"
import {
  ThemeSwitcher,
  type ThemeSwitcherMode,
} from "@diametral/ui/components/theme-switcher"

export default function ThemeSwitcherSettingsRow() {
  const [mode, setMode] = React.useState<ThemeSwitcherMode>("system")

  return (
    <Panel className="w-full max-w-sm">
      <PanelHeader className="border-b">
        <PanelTitle>Appearance</PanelTitle>
      </PanelHeader>
      <PanelContent className="px-0">
        <PanelRow>
          <span className="text-sm">Theme</span>
          <ThemeSwitcher value={mode} onValueChange={setMode} />
        </PanelRow>
        <PanelRow>
          <Label htmlFor="settings-reduce-motion">Reduce motion</Label>
          <Switch id="settings-reduce-motion" />
        </PanelRow>
      </PanelContent>
    </Panel>
  )
}
