"use client"

import {
  Button,
  Checkbox,
  FieldArray,
  FieldArrayAdd,
  FieldArrayItem,
  FieldArrayItemContent,
  FieldArrayRemove,
  Form,
  FormField,
  Input,
  Select,
} from "@diametral/design-system/react"
import * as React from "react"

const UNITS = [
  { value: "day", label: "Day" },
  { value: "hour", label: "Hour" },
  { value: "unit", label: "Unit" },
]

let nextId = 2

/* Submission with no array state beyond the row list. Each control's own
   `name` is indexed per entry — `lines[0].label` — so a plain form submit
   carries the whole array and `FormData` reads it back. That is the point of
   FieldArray holding nothing: the array lives in the markup, not in a store.
   The keys come off `line.id`, never the index — keyed by index, removing a
   row makes React reuse the wrong node and the values below shift up by one.

   `--stretch` and `--grid` are the modifiers that replaced the source's
   literal `flex-col items-stretch` and `grid grid-cols-2` overrides. */
export default function FieldArraySubmit() {
  const [lines, setLines] = React.useState([{ id: 1 }])
  const [submitted, setSubmitted] = React.useState<string[]>()

  return (
    <Form
      className="w-full max-w-lg gap-6"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        setSubmitted([...data].map(([key, value]) => `${key} = ${value}`))
      }}
    >
      <fieldset>
        <legend>Quote lines</legend>
        <FieldArray>
          {lines.map((line, index) => (
            <FieldArrayItem
              key={line.id}
              className="ds-field-array-item--stacked ds-field-array-item--stretch"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase">
                  Line {index + 1}
                </span>
                {lines.length > 1 && (
                  <FieldArrayRemove
                    label={`Remove line ${index + 1}`}
                    onClick={() =>
                      setLines(lines.filter((row) => row.id !== line.id))
                    }
                  />
                )}
              </div>
              <FieldArrayItemContent className="ds-field-array-item-content--grid gap-3">
                <FormField
                  label="Description"
                  htmlFor={`quote-line-${line.id}-label`}
                >
                  <Input
                    id={`quote-line-${line.id}-label`}
                    name={`lines[${index}].label`}
                    placeholder="Design review"
                  />
                </FormField>
                <FormField label="Unit" htmlFor={`quote-line-${line.id}-unit`}>
                  <Select
                    id={`quote-line-${line.id}-unit`}
                    name={`lines[${index}].unit`}
                    defaultValue="day"
                    options={UNITS}
                    block
                  />
                </FormField>
                <div className="col-span-2">
                  <Checkbox name={`lines[${index}].billable`} defaultChecked>
                    Billable
                  </Checkbox>
                </div>
              </FieldArrayItemContent>
            </FieldArrayItem>
          ))}
          <FieldArrayAdd onClick={() => setLines([...lines, { id: nextId++ }])}>
            Add a line
          </FieldArrayAdd>
        </FieldArray>
      </fieldset>

      <Button type="submit" className="self-start">
        Submit quote
      </Button>

      {submitted && (
        <pre className="overflow-x-auto border border-border p-3 font-mono text-xs">
          {submitted.join("\n") || "(no entries)"}
        </pre>
      )}
    </Form>
  )
}
