"use client"

import {
  FieldArray,
  FieldArrayAdd,
  FieldArrayItem,
  FieldArrayItemContent,
  FieldArrayRemove,
  Input,
  Select,
} from "@diametral/design-system/react"
import * as React from "react"
import { GraduationCapIcon } from "@phosphor-icons/react"

const SCHOOLS = [
  { value: "insa", label: "INSA Lyon" },
  { value: "utc", label: "UTC Compiègne" },
  { value: "kedge", label: "KEDGE" },
  { value: "dauphine", label: "Dauphine" },
]

type Diploma = { id: number; title: string; school: string }

let nextId = 3

/* Two controls per entry, and the array in the consumer's own state — this
   package owns no form state, which is why every part here holds nothing.
   The keys come off `diploma.id`, never the index: keyed by index, removing a
   row makes React reuse the wrong DOM node and the values below it shift up.

   The source's five-part Select collapses onto this package's native one,
   which takes its options as a prop. That is the re-wiring batch 7 pays back. */
export default function FieldArrayBasic() {
  const [diplomas, setDiplomas] = React.useState<Diploma[]>([
    { id: 1, title: "BSc Industrial Engineering", school: "insa" },
    { id: 2, title: "MSc Supply Chain Management", school: "kedge" },
  ])

  return (
    <fieldset className="max-w-sm">
      <legend className="flex items-center gap-2">
        <GraduationCapIcon className="size-4" />
        Education
      </legend>
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
                name={`diplomas[${index}].school`}
                defaultValue={diploma.school}
                aria-label={`Diploma ${index + 1} school`}
                options={SCHOOLS}
                block
              />
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
    </fieldset>
  )
}
