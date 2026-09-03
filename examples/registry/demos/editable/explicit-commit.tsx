"use client"

import { Editable, FormField, Kbd } from "@diametral/design-system/react"
import * as React from "react"

/* `submitOnBlur={false}` turns blur into a discard, so the only ways through
   are the check button and Enter. Reach for it when a stray click must not
   write — a billing address, an invoice line — and leave the default when the
   edit is cheap to undo. */
export default function EditableExplicitCommit() {
  const [outcome, setOutcome] = React.useState("nothing yet")

  return (
    <div className="max-w-sm">
      <FormField
        label="Billing email"
        hint={
          <>
            Clicking away discards, so the check button or <Kbd>Enter</Kbd> is
            the only way through — last outcome: {outcome}.
          </>
        }
      >
        <Editable
          defaultValue="compta@morval.studio"
          submitOnBlur={false}
          onSubmit={(value) => setOutcome(`saved ${value}`)}
          onCancel={() => setOutcome("discarded")}
        />
      </FormField>
    </div>
  )
}
