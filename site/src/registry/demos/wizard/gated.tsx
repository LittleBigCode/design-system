import { useState } from "react"

import {
  Checkbox,
  Field,
  FieldLabel,
  Wizard,
} from "@diametral/design-system/react"

export default function WizardGated() {
  const [accepted, setAccepted] = useState(false)

  const steps = [
    {
      label: "Terms",
      disableNext: !accepted,
      content: (
        <Field orientation="horizontal">
          <Checkbox
            id="wizard-gated-terms"
            checked={accepted}
            onCheckedChange={(checked) => setAccepted(checked === true)}
          />
          <FieldLabel htmlFor="wizard-gated-terms">
            I accept the processing agreement
          </FieldLabel>
        </Field>
      ),
    },
    {
      label: "Billing",
      content: (
        <p className="text-sm text-muted-foreground">
          Invoiced monthly, cancellable at any time.
        </p>
      ),
    },
  ]

  return <Wizard steps={steps} className="max-w-lg" />
}
