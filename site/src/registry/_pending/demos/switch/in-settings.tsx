import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
  FieldTitle,
} from "@diametral/ui/components/field"
import { Switch } from "@diametral/ui/components/switch"

const SETTINGS = [
  {
    id: "digest",
    title: "Weekly digest",
    description: "One email on Monday with everything that changed.",
    on: true,
  },
  {
    id: "mentions",
    title: "Mentions",
    description: "Email me when someone names me in a review.",
    on: false,
  },
]

export default function SwitchInSettings() {
  return (
    <FieldGroup className="max-w-md">
      {SETTINGS.map((setting, index) => (
        <div key={setting.id}>
          {index > 0 && <FieldSeparator />}
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>{setting.title}</FieldTitle>
              <FieldDescription>{setting.description}</FieldDescription>
            </FieldContent>
            <Switch aria-label={setting.title} defaultChecked={setting.on} />
          </Field>
        </div>
      ))}
    </FieldGroup>
  )
}
