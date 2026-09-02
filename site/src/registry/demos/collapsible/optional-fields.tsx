import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  FieldHint,
  FormField,
  Input,
  Textarea,
} from "@diametral/design-system/react"
import { CaretDownIcon } from "@phosphor-icons/react"

export default function CollapsibleOptionalFields() {
  return (
    <form
      className="flex w-full max-w-sm flex-col gap-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <FormField label="Reference" htmlFor="collapsible-fields-reference">
        <Input
          id="collapsible-fields-reference"
          name="reference"
          defaultValue="INV-014"
        />
      </FormField>
      <Collapsible>
        <CollapsibleTrigger
          render={
            <Button size="sm" className="group/optional">
              Purchase order details
              <CaretDownIcon className="transition-transform group-aria-expanded/optional:rotate-180" />
            </Button>
          }
        />
        <CollapsibleContent keepMounted className="mt-3 flex flex-col gap-4">
          <FormField label="Purchase order" htmlFor="collapsible-fields-po">
            <Input
              id="collapsible-fields-po"
              name="purchaseOrder"
              placeholder="PO-2026-114"
            />
          </FormField>
          <FormField
            label="Note to the client"
            htmlFor="collapsible-fields-note"
          >
            <Textarea
              id="collapsible-fields-note"
              name="note"
              rows={3}
              placeholder="Delivered against the July milestone."
            />
            <FieldHint>Printed under the invoice total.</FieldHint>
          </FormField>
        </CollapsibleContent>
      </Collapsible>
      <Button type="submit" size="sm" className="self-start">
        Save draft
      </Button>
    </form>
  )
}
