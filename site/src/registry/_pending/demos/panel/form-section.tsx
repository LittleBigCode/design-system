import { Button } from "@diametral/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"
import { Input } from "@diametral/ui/components/input"
import {
  Panel,
  PanelContent,
  PanelFooter,
  PanelHeader,
  PanelTitle,
} from "@diametral/ui/components/panel"

export default function PanelFormSection() {
  return (
    <Panel className="w-full max-w-sm">
      <PanelHeader className="border-b">
        <PanelTitle>Profile</PanelTitle>
      </PanelHeader>
      <PanelContent className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="panel-form-name">Display name</FieldLabel>
          <Input id="panel-form-name" defaultValue="Augustin Morval" />
        </Field>
        <Field>
          <FieldLabel htmlFor="panel-form-handle">Handle</FieldLabel>
          <Input id="panel-form-handle" defaultValue="amorval" />
          <FieldDescription>Shown on shared dashboards.</FieldDescription>
        </Field>
      </PanelContent>
      <PanelFooter className="justify-end gap-2 border-t">
        <Button size="sm" variant="ghost">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </PanelFooter>
    </Panel>
  )
}
