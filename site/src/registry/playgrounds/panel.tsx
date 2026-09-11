import type { ComponentProps } from "react"
import {
  Button,
  Label,
  Panel,
  PanelContent,
  PanelFooter,
  PanelHeader,
  PanelRow,
  PanelTitle,
  Switch,
} from "@diametral/design-system/react"

// The template renders every Panel part: the Workbench's code strip doubles as
// the anatomy navigator, so a part missing here would not be selectable.
export default function PanelPlayground({
  children,
  description = "Choose which updates land in your inbox.",
  row = "Email alerts",
  action = "Manage",
  ...props
}: ComponentProps<typeof Panel> & {
  description?: string
  row?: string
  action?: string
}) {
  return (
    <Panel {...props} className="w-full max-w-sm">
      <PanelHeader className="border-b">
        <PanelTitle>{children}</PanelTitle>
      </PanelHeader>
      <PanelContent className="px-0">
        <p className="px-(--panel-spacing) pb-3 text-muted-foreground">
          {description}
        </p>
        <PanelRow>
          <Label htmlFor="panel-playground-switch">{row}</Label>
          <Switch id="panel-playground-switch" defaultChecked />
        </PanelRow>
      </PanelContent>
      <PanelFooter className="border-t">
        <Button size="sm" variant="outline">
          {action}
        </Button>
      </PanelFooter>
    </Panel>
  )
}
