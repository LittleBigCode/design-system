import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
  Switch,
} from "@diametral/design-system/react"

export default function AccordionSettings() {
  return (
    <Panel className="w-full max-w-md">
      <PanelHeader ruled>
        <PanelTitle>Project settings</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <Accordion defaultValue={["general"]}>
          <AccordionItem value="general">
            <AccordionTrigger>General</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <Field>
                <FieldLabel htmlFor="accordion-settings-name">
                  Project name
                </FieldLabel>
                <Input
                  id="accordion-settings-name"
                  defaultValue="Régie Ouest"
                />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="accordion-settings-visible">
                  Visible to the client
                </FieldLabel>
                <Switch id="accordion-settings-visible" defaultChecked />
              </Field>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="billing">
            <AccordionTrigger>Billing</AccordionTrigger>
            <AccordionContent>
              <Field>
                <FieldLabel htmlFor="accordion-settings-po">
                  Purchase order
                </FieldLabel>
                <Input id="accordion-settings-po" defaultValue="PO-2026-114" />
                <FieldDescription>
                  Printed on every invoice raised against this project.
                </FieldDescription>
              </Field>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="archive">
            <AccordionTrigger>Archive</AccordionTrigger>
            <AccordionContent className="flex flex-col items-start gap-3">
              <p className="text-muted-foreground">
                Archiving hides the project from the sidebar and freezes its
                invoices. Nothing is deleted.
              </p>
              <Button variant="outline" size="sm">
                Archive project
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </PanelContent>
    </Panel>
  )
}
