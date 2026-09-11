import {
  Label,
  Panel,
  PanelContent,
  PanelHeader,
  PanelRow,
  PanelTitle,
  Switch,
} from "@diametral/design-system/react"
const SETTINGS = [
  { id: "email-alerts", label: "Email alerts", on: true },
  { id: "weekly-digest", label: "Weekly digest", on: false },
  { id: "mentions", label: "Mentions", on: true },
]

export default function PanelRows() {
  return (
    <Panel className="w-full max-w-sm">
      <PanelHeader className="border-b">
        <PanelTitle>Notifications</PanelTitle>
      </PanelHeader>
      <PanelContent className="px-0">
        {SETTINGS.map((setting) => (
          <PanelRow key={setting.id}>
            <Label htmlFor={setting.id}>{setting.label}</Label>
            <Switch id={setting.id} defaultChecked={setting.on} />
          </PanelRow>
        ))}
      </PanelContent>
    </Panel>
  )
}
