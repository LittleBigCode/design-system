import * as React from "react"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
  FieldTitle,
} from "@diametral/ui/components/field"
import { Label } from "@diametral/ui/components/label"
import { Switch } from "@diametral/ui/components/switch"

const CHANNELS = [
  { id: "releases", label: "Release notes" },
  { id: "incidents", label: "Incidents" },
  { id: "digest", label: "Weekly digest" },
]

export default function SwitchMasterToggle() {
  const [enabled, setEnabled] = React.useState(true)

  return (
    <FieldGroup className="max-w-md">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Email notifications</FieldTitle>
          <FieldDescription>
            Turning this off silences every channel below.
          </FieldDescription>
        </FieldContent>
        <Switch
          aria-label="Email notifications"
          checked={enabled}
          onCheckedChange={setEnabled}
        />
      </Field>
      <div>
        <FieldSeparator />
        <div className="flex flex-col gap-4 ps-6">
          {CHANNELS.map((channel) => (
            <div key={channel.id} className="flex items-center justify-between">
              <Label htmlFor={`switch-channel-${channel.id}`}>
                {channel.label}
              </Label>
              <Switch
                id={`switch-channel-${channel.id}`}
                size="sm"
                defaultChecked
                disabled={!enabled}
              />
            </div>
          ))}
        </div>
      </div>
    </FieldGroup>
  )
}
