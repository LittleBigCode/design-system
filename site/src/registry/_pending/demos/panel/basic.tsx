import { Button } from "@diametral/ui/components/button"
import {
  Panel,
  PanelContent,
  PanelFooter,
  PanelHeader,
  PanelTitle,
} from "@diametral/ui/components/panel"

export default function PanelBasic() {
  return (
    <Panel className="w-full max-w-sm">
      <PanelHeader className="border-b">
        <PanelTitle>Storage</PanelTitle>
      </PanelHeader>
      <PanelContent className="text-muted-foreground">
        6.2 GB of 10 GB used across 214 files.
      </PanelContent>
      <PanelFooter className="border-t">
        <Button size="sm" variant="outline">
          Manage
        </Button>
      </PanelFooter>
    </Panel>
  )
}
