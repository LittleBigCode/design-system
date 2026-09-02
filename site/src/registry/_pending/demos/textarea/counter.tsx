import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"
import { Textarea } from "@diametral/ui/components/textarea"

const LIMIT = 140

export default function TextareaCounter() {
  const [summary, setSummary] = React.useState(
    "Ships the flat panel family and retires the elevation scale."
  )

  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="textarea-counter">Summary</FieldLabel>
        <Textarea
          id="textarea-counter"
          rows={2}
          maxLength={LIMIT}
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
        />
        <FieldDescription className="flex justify-between gap-4">
          Shown beside the version in the changelog.
          <span>
            {summary.length}/{LIMIT}
          </span>
        </FieldDescription>
      </Field>
    </div>
  )
}
