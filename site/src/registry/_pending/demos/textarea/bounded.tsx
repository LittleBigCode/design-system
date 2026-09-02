import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"
import { Textarea } from "@diametral/ui/components/textarea"

const NOTES = `Reviewed the flat-panel migration with design and platform.

Agreed: Card keeps its elevation for overlays only, every in-page container moves to Panel, and the shadow scale is deleted once the last two dashboards are ported.

Open: whether the settings rows keep their own divider or inherit PanelRow's.`

export default function TextareaBounded() {
  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="textarea-bounded">Meeting notes</FieldLabel>
        <Textarea
          id="textarea-bounded"
          rows={3}
          defaultValue={NOTES}
          className="max-h-40 overflow-y-auto"
        />
        <FieldDescription>
          Grows to ten lines, then scrolls inside itself.
        </FieldDescription>
      </Field>
    </div>
  )
}
