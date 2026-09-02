"use client"

import * as React from "react"

import { Button } from "@diametral/ui/components/button"
import { Checkbox } from "@diametral/ui/components/checkbox"
import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@diametral/ui/components/field"
import {
  FieldArray,
  FieldArrayAdd,
  FieldArrayItem,
  FieldArrayItemContent,
  FieldArrayRemove,
} from "@diametral/ui/components/field-array"
import { Form } from "@diametral/ui/components/form"
import { Input } from "@diametral/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@diametral/ui/components/select"
import { Label } from "@diametral/ui/components/label"

const UNITS = { day: "Day", hour: "Hour", unit: "Unit" }

let nextId = 2

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
      <FieldSet>
        <FieldLegend>Quote lines</FieldLegend>
        <FieldArray>
          {lines.map((line, index) => (
            <FieldArrayItem key={line.id} className="flex-col items-stretch">
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
              <FieldArrayItemContent className="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor={`quote-line-${line.id}-label`}>
                    Description
                  </FieldLabel>
                  <Input
                    id={`quote-line-${line.id}-label`}
                    name={`lines[${index}].label`}
                    placeholder="Design review"
                  />
                </Field>
                <Field>
                  <FieldLabel id={`quote-line-${line.id}-unit-label`}>
                    Unit
                  </FieldLabel>
                  <Select
                    items={UNITS}
                    name={`lines[${index}].unit`}
                    defaultValue="day"
                  >
                    <SelectTrigger
                      className="w-full"
                      aria-labelledby={`quote-line-${line.id}-unit-label`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(UNITS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <div className="col-span-2 flex items-center gap-2.5">
                  <Checkbox
                    id={`quote-line-${line.id}-billable`}
                    name={`lines[${index}].billable`}
                    defaultChecked
                  />
                  <Label htmlFor={`quote-line-${line.id}-billable`}>
                    Billable
                  </Label>
                </div>
              </FieldArrayItemContent>
            </FieldArrayItem>
          ))}
          <FieldArrayAdd onClick={() => setLines([...lines, { id: nextId++ }])}>
            Add a line
          </FieldArrayAdd>
        </FieldArray>
      </FieldSet>

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
