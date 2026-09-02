"use client"

import {
  FieldArray,
  FieldArrayAdd,
  FieldArrayItem,
  FieldArrayItemContent,
  FieldArrayRemove,
  FieldHint,
  FormField,
  Input,
} from "@diametral/design-system/react"
import * as React from "react"

const MAX = 3

let nextId = 2

/* A bounded array: the add button disables at the ceiling and the last entry
   keeps no remove button, so the list can never reach zero. Both are the
   consumer's rules — FieldArray holds no count and no minimum. */
export default function FieldArrayLimits() {
  const [recipients, setRecipients] = React.useState([{ id: 1 }])

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <FieldArray>
        {recipients.map((recipient, index) => (
          <FieldArrayItem key={recipient.id}>
            <FieldArrayItemContent>
              <FormField
                label={`Recipient ${index + 1}`}
                htmlFor={`field-array-limits-${recipient.id}`}
              >
                <Input
                  id={`field-array-limits-${recipient.id}`}
                  name={`recipients[${index}].email`}
                  type="email"
                  defaultValue={index === 0 ? "compta@atelier-nord.fr" : ""}
                  placeholder="name@company.com"
                />
              </FormField>
            </FieldArrayItemContent>
            {recipients.length > 1 && (
              <FieldArrayRemove
                label={`Remove recipient ${index + 1}`}
                onClick={() =>
                  setRecipients(
                    recipients.filter((row) => row.id !== recipient.id)
                  )
                }
              />
            )}
          </FieldArrayItem>
        ))}
        <FieldArrayAdd
          disabled={recipients.length >= MAX}
          onClick={() => setRecipients([...recipients, { id: nextId++ }])}
        >
          Add a recipient
        </FieldArrayAdd>
      </FieldArray>
      <FieldHint>
        {recipients.length} of {MAX} recipients. The last one cannot be removed.
      </FieldHint>
    </div>
  )
}
