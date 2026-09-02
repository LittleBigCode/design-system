import { Label } from "@diametral/ui/components/label"
import { Switch } from "@diametral/ui/components/switch"

export default function SwitchBasic() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <Switch id="switch-a" defaultChecked />
        <Label htmlFor="switch-a">Checked</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Switch id="switch-b" />
        <Label htmlFor="switch-b">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Switch id="switch-c" size="sm" defaultChecked />
        <Label htmlFor="switch-c">Small</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Switch id="switch-d" disabled />
        <Label htmlFor="switch-d">Disabled</Label>
      </div>
    </div>
  )
}
