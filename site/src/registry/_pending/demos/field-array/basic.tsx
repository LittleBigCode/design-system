"use client"

import * as React from "react"
import { GraduationCapIcon } from "@phosphor-icons/react"

import {
  FieldArray,
  FieldArrayAdd,
  FieldArrayItem,
  FieldArrayItemContent,
  FieldArrayRemove,
} from "@diametral/ui/components/field-array"
import { FieldLegend, FieldSet } from "@diametral/ui/components/field"
import { Input } from "@diametral/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@diametral/ui/components/select"

const SCHOOLS = {
  insa: "INSA Lyon",
  utc: "UTC Compiègne",
  kedge: "KEDGE",
  dauphine: "Dauphine",
}

type Diploma = { id: number; title: string; school: string }

let nextId = 3

export default function FieldArrayBasic() {
  const [diplomas, setDiplomas] = React.useState<Diploma[]>([
    { id: 1, title: "BSc Industrial Engineering", school: "insa" },
    { id: 2, title: "MSc Supply Chain Management", school: "kedge" },
  ])

  return (
    <FieldSet className="max-w-sm">
      <FieldLegend className="flex items-center gap-2">
        <GraduationCapIcon className="size-4" />
        Education
      </FieldLegend>
      <FieldArray>
        {diplomas.map((diploma, index) => (
          <FieldArrayItem key={diploma.id}>
            <FieldArrayItemContent>
              <Input
                name={`diplomas[${index}].title`}
                defaultValue={diploma.title}
                aria-label={`Diploma ${index + 1} title`}
                placeholder="Diploma"
              />
              <Select
                items={SCHOOLS}
                name={`diplomas[${index}].school`}
                defaultValue={diploma.school}
              >
                <SelectTrigger
                  className="w-full"
                  aria-label={`Diploma ${index + 1} school`}
                >
                  <SelectValue placeholder="School" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SCHOOLS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldArrayItemContent>
            <FieldArrayRemove
              label={`Remove diploma ${index + 1}`}
              onClick={() =>
                setDiplomas(diplomas.filter((row) => row.id !== diploma.id))
              }
            />
          </FieldArrayItem>
        ))}
        <FieldArrayAdd
          onClick={() =>
            setDiplomas([
              ...diplomas,
              { id: nextId++, title: "", school: "insa" },
            ])
          }
        >
          Add a diploma
        </FieldArrayAdd>
      </FieldArray>
    </FieldSet>
  )
}
