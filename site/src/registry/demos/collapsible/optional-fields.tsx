import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Field,
  FieldDescription,
  FieldLabel,
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
      <Field>
        <FieldLabel htmlFor="collapsible-fields-reference">
          Reference
        </FieldLabel>
        <Input
          id="collapsible-fields-reference"
          name="reference"
          defaultValue="INV-014"
        />
      </Field>
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
          <Field>
            <FieldLabel htmlFor="collapsible-fields-po">
              Purchase order
            </FieldLabel>
            <Input
              id="collapsible-fields-po"
              name="purchaseOrder"
              placeholder="PO-2026-114"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="collapsible-fields-note">
              Note to the client
            </FieldLabel>
            <Textarea
              id="collapsible-fields-note"
              name="note"
              rows={3}
              placeholder="Delivered against the July milestone."
            />
            <FieldDescription>
              Printed under the invoice total.
            </FieldDescription>
          </Field>
        </CollapsibleContent>
      </Collapsible>
      <Button type="submit" size="sm" className="self-start">
        Save draft
      </Button>
    </form>
  )
}
