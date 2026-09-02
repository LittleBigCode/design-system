"use client"

import * as React from "react"

import {
  FieldArray,
  FieldArrayAdd,
  FieldArrayItem,
  FieldArrayItemContent,
  FieldArrayRemove,
} from "@diametral/ui/components/field-array"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"
import { Input } from "@diametral/ui/components/input"

const MAX = 3

let nextId = 2

export default function FieldArrayLimits() {
  const [recipients, setRecipients] = React.useState([{ id: 1 }])

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <FieldArray>
        {recipients.map((recipient, index) => (
          <FieldArrayItem key={recipient.id}>
            <FieldArrayItemContent>
              <Field>
                <FieldLabel htmlFor={`field-array-limits-${recipient.id}`}>
                  Recipient {index + 1}
                </FieldLabel>
                <Input
                  id={`field-array-limits-${recipient.id}`}
                  name={`recipients[${index}].email`}
                  type="email"
                  defaultValue={index === 0 ? "compta@atelier-nord.fr" : ""}
                  placeholder="name@company.com"
                />
              </Field>
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
      <FieldDescription>
        {recipients.length} of {MAX} recipients. The last one cannot be removed.
      </FieldDescription>
    </div>
  )
}
