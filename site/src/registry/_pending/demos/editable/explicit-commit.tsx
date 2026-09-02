import * as React from "react"

import { Editable } from "@diametral/ui/components/editable"
import {
  Field,
  FieldDescription,
  FieldTitle,
} from "@diametral/ui/components/field"
import { Kbd } from "@diametral/ui/components/kbd"

export default function EditableExplicitCommit() {
  const [outcome, setOutcome] = React.useState("nothing yet")

  return (
    <Field className="max-w-sm">
      <FieldTitle>Billing email</FieldTitle>
      <Editable
        defaultValue="compta@morval.studio"
        submitOnBlur={false}
        onSubmit={(value) => setOutcome(`saved ${value}`)}
        onCancel={() => setOutcome("discarded")}
      />
      <FieldDescription>
        Clicking away discards, so the check button or <Kbd>Enter</Kbd> is the
        only way through — last outcome: {outcome}.
      </FieldDescription>
    </Field>
  )
}
